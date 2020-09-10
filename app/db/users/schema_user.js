const Schema = require("mongoose").Schema;

const UserSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }, {versionKey: false}
);

module.exports = UserSchema;