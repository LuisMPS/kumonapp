const {Stage} = require("../stage");
const photo = require("./stage_photo");
const report = require("./stage_report");

const entry = new Stage("entry", photo, report);
module.exports = entry;

/* HOW TO USE => --- entry.pipe(DATA FROM QUERY); --- */