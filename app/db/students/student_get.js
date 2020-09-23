const Student = require("./student");
const queryParser = require("./stages/parser");
const {entryStudent} = require("./stages/query/stage_entry");

function getStudent(req, res) {
	try {
		const query = queryParser(entryStudent, req.query);
		const {filters = {}, select} = query;
		Student.find(filters, select).lean()
		.then(students => res.status(200).send(students))
		.catch(err => res.status(400).send(err));
	} catch (e) { res.status(400).json(e); }	
}

module.exports = getStudent;