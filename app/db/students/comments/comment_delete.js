const Comment = require("./comment");

function deleteComment(req, res) {
    const uuid = req.query["uuid"];
    if (!uuid) { res.status(400).json({err: "Insufficient information"}); return; }
	Comment.deleteOne({uuid}, (err) => {
		if (err) { res.status(400).json(err); return; }
		res.sendStatus(204);
	});
}

module.exports = deleteComment;