const {Stage} = require("../stage");
const dates = require("./stage_dates");
const compare = require("./stage_compare");
const autocomplete = require("./stage_autocomplete");
const select = require("./stage_select");
const fallback = require("./stage_entry_fallback");

const entry = new Stage("entry", dates, compare, autocomplete, select);
entry.setFallback(fallback);
module.exports = entry;

/* HOW TO USE => --- entry.pipe(DATA FROM QUERY); --- */