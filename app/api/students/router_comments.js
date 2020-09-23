const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const getComment = require("../../db/students/comments/comment_get");
router.get("/", getComment); 

const postComment = require("../../db/students/comments/comment_post");
router.post("/", bodyParser.json(), postComment); 

const updateComment = require("../../db/students/comments/comment_update");
router.put("/update",  bodyParser.json(), updateComment); 

const deleteComment = require("../../db/students/comments/comment_delete");
router.delete("/delete", deleteComment);

module.exports = router;