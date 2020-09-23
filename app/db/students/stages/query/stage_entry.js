const {Stage} = require("../stage");
const Student = require("../../student");
const Comment = require("../../comments/comment");

const dates = require("./stage_dates");
const compare = require("./stage_compare");
const autocomplete = require("./stage_autocomplete");
const detect = require("./stage_detect");
const exists = require("./stage_exists");
const select = require("./stage_select");
const sort = require("./stage_sort");
const limit = require("./stage_limit");
const fallback = require("./stage_entry_fallback");

const StudentSchema = Student.schema;
const CommentSchema = Comment.schema;

const BasicStages = [dates, compare, detect, exists, select];

const StudentStages = [...BasicStages, autocomplete].map(stage => stage(StudentSchema));
const CommentStages = [...BasicStages, sort].map(stage => stage(CommentSchema)).concat([limit]);

const entryStudent = new Stage("entryStudent", ...StudentStages);
entryStudent.setFallback(fallback);

const entryComment = new Stage("entryComment", ...CommentStages);
entryComment.setFallback(fallback);

exports.entryStudent = entryStudent;
exports.entryComment = entryComment;

/* HOW TO USE => --- entry.pipe(DATA FROM QUERY); --- */