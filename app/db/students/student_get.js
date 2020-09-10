const Student = require("./student");
const {InvalidStageError} = require("./stages/stage");
const entry = require("./stages/query/stage_entry");

function getStudent(req, res) {
	try {
		const query = queryParser(req.query);
		const {filters, select} = query;
		Student.find(filters, select).lean()
		.then(students => res.status(200).send(students))
		.catch(err => res.status(400).send(err));
	} catch (e) { res.status(400).json(e); }	
}

function queryParser(query) {
	return Object.keys(query).reduce((asked, key) => {
		const stages = key.split("_");
		const {select, filters} = entry.pipe(stages, query[key]);
		if (select) Object.assign(asked.select, select);
		if (filters) asked.filters.$and = [...asked.filters.$and, filters];
		return asked;
	}, { select: {}, filters: { $and: [] } });
}

module.exports = getStudent;