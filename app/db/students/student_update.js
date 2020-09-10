const Student = require("./student");

function updateStudent(req, res) {
	const uuid = req.query["uuid"];
	if (!uuid) { res.status(400).json({err: "Insufficient information"}); return; }
	const update = req.body;
	Student.findOne({uuid}, (err, doc) => {
		if (err) { res.status(400).json(err); return; }
		doc.set(update).save()
		.then(() => res.sendStatus(204))
		.catch(err => res.status(400).json(err));
	});
}

module.exports = updateStudent;