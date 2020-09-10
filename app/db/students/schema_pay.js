const Schema = require("mongoose").Schema;

const PaySchema = new Schema(
    {
        amount: {
            type: Number,
            default: 0
        },
        method: {
            type: String,
        },
        paid: {
            type: Date
        },
        starting: {
            type: Date
        }
    }, {versionKey: false, _id: false}
);

module.exports = PaySchema;