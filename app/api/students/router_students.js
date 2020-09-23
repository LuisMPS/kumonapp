const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const protect = require("../router_protect");

router.use("/", protect);

const getStudent = require("../../db/students/student_get");
router.get("/", getStudent); 

const postStudent = require("../../db/students/student_post");
router.post("/", bodyParser.json(), postStudent); 

const updateStudent = require("../../db/students/student_update");
router.put("/update",  bodyParser.json(), updateStudent); 

const deleteStudent = require("../../db/students/student_delete");
router.delete("/delete", deleteStudent);

const uploadRouter = require("../../db/students/router_upload");
router.use("/upload", uploadRouter);

const {subStudent, unsubStudent} = require("../../db/students/student_programs");
router.put("/programs", bodyParser.json(), subStudent);
router.delete("/programs", unsubStudent);

const commentsRouter = require("./router_comments");
router.use("/comments", commentsRouter);

module.exports = router;