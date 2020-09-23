const Comment = require("./comment");

function updateComment(req, res) {
	const uuid = req.query["uuid"];
	if (!uuid) { res.status(400).json({err: "Insufficient information"}); return; }
	const update = {...req.body, $inc: {editions: 1}};
	Comment.updateOne({uuid}, update)
	.then(() => res.sendStatus(204))
	.catch(err => res.status(400).send(err));
}

module.exports = updateComment;