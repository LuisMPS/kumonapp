const mongoose = require("mongoose");
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const db = `kumon`;
const url = `mongodb+srv://${user}:${password}@${host}/${db}?retryWrites=true&w=majority`;

const connection = mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

module.exports = connection;
