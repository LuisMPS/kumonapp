const {Stage} = require("../stage");
const dates = require("./stage_dates");
const compare = require("./stage_compare");
const autocomplete = require("./stage_autocomplete");
const exists = require("./stage_exists");
const select = require("./stage_select");
const fallback = require("./stage_entry_fallback");

const entry = new Stage("entry", dates, compare, autocomplete, exists, select);
entry.setFallback(fallback);
module.exports = entry;

/* HOW TO USE => --- entry.pipe(DATA FROM QUERY); --- */