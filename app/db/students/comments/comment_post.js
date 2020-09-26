const Comment = require("./comment");
const {v4: uuidV4} = require("uuid");

function postComment(req, res) {
	const {sub: uuid, name: name} = req.user;
	req.body.author = {};
	req.body.author.name = name;
	req.body.author.uuid = uuid;
	req.body.uuid = uuidV4();
	const comment = Comment.create(req.body);
	comment.then(() => res.sendStatus(204))
	.catch(err => res.status(400).json(err));
}

module.exports = postComment;