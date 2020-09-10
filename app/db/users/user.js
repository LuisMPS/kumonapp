const mongoose = require("mongoose");
const UserSchema = require("./schema_user");
const collection = `users`;

const User = mongoose.model(collection, UserSchema);

module.exports = User;