const express = require("express");
const router = express.Router();
const studentsRouter = require("./students/router_students");
const usersRouter = require("./users/router_users");

router.use("/students", studentsRouter);
router.use("/users", usersRouter);

module.exports = router;