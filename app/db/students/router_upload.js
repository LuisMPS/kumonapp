const express = require("express");
const mime = require("mime");
const bodyParser = require("body-parser");
const router = express.Router();
const Student = require("./student");
const entry = require("./stages/upload/stage_entry");
const AWS = require("aws-sdk");

const accessKeyId = process.env.IAM_ACCESS_KEY_ID;
const secretAccessKey = process.env.IAM_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const Bucket = process.env.AWS_S3_BUCKET;
const signatureVersion = "v4";
const s3 = new AWS.S3({accessKeyId, secretAccessKey, region, signatureVersion});

router.post("/*", upload);
router.put("/*", bodyParser.json(), update);
router.get("/*", presigned);

function upload(req, res) {
	const ext = mime.getExtension(req.get("Content-Type"));
	const type = req.params[0];
	const uuid = req.query["uuid"];
	const src = `${type}/${uuid}.${ext}`;
	const params = {Bucket, Key: src, Body: req};
	const uploader = s3.upload(params);
	const promise = uploader.promise();
	promise.then(() => {
		const [group, ...rest] = type.split("/"); 
		const uploaded = entry.pipe([group, rest.join("/")]);
		Student.updateOne({uuid}, {[uploaded]: src})
		.then(() => res.status(201).json({src}))
		.catch(err => res.status(400).json(err));
	}).catch(err => res.status(500).json(err));
}

function presigned(req, res) {
	const type = req.params[0];
	const uuid = req.query["uuid"];
	const allowedKey = [type, uuid].join("/");
	const params = {Bucket, Conditions: [["starts-with", "$key", allowedKey]]};
	const signature = new Promise((resolve, reject) => { s3.createPresignedPost(params, (err, data) => {
		if (err) reject(err);
		else resolve(data);
	})});
	signature.then(data => res.status(200).send(data))
	.catch(err => res.status(400).send(err));
}

function update(req, res) {
	const {src} = req.body;
	const type = req.params[0];
	const uuid = req.query["uuid"];
	const [group, ...rest] = type.split("/"); 
	const uploaded = entry.pipe([group, rest.join("/")]);
	Student.updateOne({uuid}, {[uploaded]: src})
	.then(() => res.status(201).json({src}))
	.catch(err => res.status(400).json(err));
}

module.exports = router;