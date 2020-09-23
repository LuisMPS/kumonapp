const Comment = require("./comment");
const {v4: uuidV4} = require("uuid");

function postComment(req, res) {
	req.body.uuid = uuidV4();
	const comment = Comment.create(req.body);
	comment.then(() => res.sendStatus(204))
	.catch(err => res.status(400).json(err));
}

module.exports = postComment;