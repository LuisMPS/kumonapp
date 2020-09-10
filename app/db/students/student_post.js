const Student = require("./student");
const {v4: uuidV4} = require("uuid");

function postStudent(req, res) {
	req.body.uuid = uuidV4();
	const student = Student.create(req.body);
	student.then(() => res.sendStatus(204))
	.catch(err => {res.status(400).json(err); console.log(err)});
}

module.exports = postStudent;