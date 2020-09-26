const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const protect = require("../router_protect");

const postUser = require("../../db/users/user_post");
router.post("/", bodyParser.json(), postUser);

const getUserComments = require("../../db/users/user_get_comments");
router.get("/comments", protect, getUserComments);

module.exports = router;