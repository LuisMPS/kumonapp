const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const auth = require("./auth/auth_jwt");

const postUser = require("./db/users/user_post");
router.post("/users", bodyParser.json(), postUser);

router.use("/", function(req, res, next) {
    passport.authenticate('jwt', {session: false}, function(err, user, info) {
        if (err) { return res.status(400).send(err); }
        if (!user) { return res.status(401).send(info); }
        return next();
    })(req, res, next);
});

const getStudent = require("./db/students/student_get");
router.get("/students", getStudent); 

const postStudent = require("./db/students/student_post");
router.post("/students", bodyParser.json(), postStudent); 

const updateStudent = require("./db/students/student_update");
router.put("/students/update",  bodyParser.json(), updateStudent); 

const deleteStudent = require("./db/students/student_delete");
router.delete("/students/delete", deleteStudent);

const uploadRouter = require("./db/students/router_upload");
router.use("/students/upload", uploadRouter);

const {subStudent, unsubStudent} = require("./db/students/student_programs");
router.put("/students/programs", bodyParser.json(), subStudent);
router.delete("/students/programs", unsubStudent);

module.exports = router;