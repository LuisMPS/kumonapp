const Student = require("./student");

const programSubStudent = programStudent({isSub: true});
const programUnsubStudent = programStudent({isSub: false});

function programStudent({isSub}) {
    return function(req, res) {
        const uuid = req.query["uuid"];
        const program = req.query["program"];
        if (!uuid || !program) { res.status(400).json({err: "Insufficient information"}); return; }
        const path = `programs.${program}`;
        const update = {[path]: isSub ? req.body : undefined};
        Student.updateOne({uuid}, update)
        .then(() => res.sendStatus(204))
        .catch(err => res.status(400).json(err));
    }
}

exports.subStudent = programSubStudent;
exports.unsubStudent = programUnsubStudent;