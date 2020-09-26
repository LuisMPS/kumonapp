const Comment = require("../students/comments/comment");
const queryParser = require("../students/stages/parser");
const {entryComment} = require("../students/stages/query/stage_entry");

function getUserComments(req, res) {
	try {
		const query = queryParser(entryComment, req.query);
		const {select, limit = {}, sort} = query;
        const {from, to} = limit;
        const {sub: uuid} = req.user;
		const filters = {"author.uuid": uuid};
		const populate = {path: "student-info", select: {fullname: 1, _id: 0}, options: {lean: true}};
		Comment.find(filters, select).populate(populate)
		.lean().sort(sort).skip(from).limit(to)
		.then(comments => res.status(200).send(comments))
		.catch(err => res.status(400).send(err));
	} catch (err) { res.status(400).json(err); }	
}

module.exports = getUserComments;