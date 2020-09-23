const Comment = require("./comment");
const queryParser = require("../stages/parser");
const {entryComment} = require("../stages/query/stage_entry");

function getComment(req, res) {
	try {
		const query = queryParser(entryComment, req.query);
		const {filters = {}, limit = {}, select, sort} = query;
		const {from, to} = limit;
        Comment.find(filters, select).lean().sort(sort).skip(from).limit(to)
		.then(comments => res.status(200).send(comments))
		.catch(err => res.status(400).send(err));
	} catch (err) { res.status(400).json(err); }	
}

module.exports = getComment;