const Student = require("./student");

function deleteStudent(req, res) {
	const uuid = req.query["uuid"] || -1;
	Student.deleteOne({uuid}, (err) => {
		if (err) { res.status(400).json(err); return; }
		res.sendStatus(204);
	});
}

module.exports = deleteStudent;