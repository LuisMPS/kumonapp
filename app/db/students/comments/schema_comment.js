const Schema = require("mongoose").Schema;
const Student = require("../student");

const CommentAuthorSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }, {_id: false, versionKey: false}
);

const CommentSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        author: {
            type: CommentAuthorSchema,
            required: true
        },
        student: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            required: true
        },
        editions: {
            type: Number,
            default: 0
        }
    }, {versionKey: false, selectPopulatedPaths: false}
);

CommentSchema.virtual("student-info", {
    ref: Student,
    localField: "student", 
    foreignField: "uuid", 
    justOne: true
});

module.exports = CommentSchema;

