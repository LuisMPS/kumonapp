const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const postUser = require("../../db/users/user_post");
router.post("/", bodyParser.json(), postUser);

module.exports = router;