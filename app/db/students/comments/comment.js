const mongoose = require("mongoose");
const CommentSchema = require("./schema_comment");
const collection = "comments";

const Comment = mongoose.model(collection, CommentSchema);

module.exports = Comment;