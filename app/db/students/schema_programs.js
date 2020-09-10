const Schema = require('mongoose').Schema;
const PaySchema = require("./schema_pay");

const ProgramInfoSchema = new Schema(
	{
		enroll: {
			type: Date,
			required: true
		},
		level: {
			type: String,
			required: true
		},
		fee: {
			type: Number,
			required: true
		},
		"report-src": {
			type: String,
			default: ''
		},
		"pay-current": {
			type: PaySchema,
			default: {starting: startOfMonthUTC(new Date(), 0)}
		},
		"pay-last": {
			type: PaySchema,
			default: {starting: startOfMonthUTC(new Date(), -1)}
		}
	}, {versionKey: false, _id: false}
);

ProgramInfoSchema.pre("save", function(next) {
	const now = new Date();
	const before = addMonthsUTC(now, -1);
	const current = new Date(this["pay-current"].starting);
	const last = new Date(this["pay-last"].starting);
	if (now.getUTCMonth() !== current.getUTCMonth() || now.getUTCFullYear() !== current.getUTCFullYear()) {
		this["pay-current"].starting  = startOfMonthUTC(now, 0);
	}
	if (before.getUTCMonth() !== last.getUTCMonth() || before.getUTCFullYear() !== last.getUTCFullYear()) {
		this["pay-last"].starting = startOfMonthUTC(now, -1);
	}
	next();
});

const programs = ["math", "reading", "english"];
const ProgramsSchema = new Schema(
	programs.reduce((schema, program) => (
		Object.assign(schema, {[program]: ProgramInfoSchema})
	), {}), {versionKey: false, _id: false, strict: "throw"}
);

function addMonthsUTC(date, count) {
	let m, d = (date = new Date(date)).getUTCDate() 
	date.setUTCMonth(date.getUTCMonth() + count, 1)
	m = date.getUTCMonth()
	date.setUTCDate(d)
	if (date.getUTCMonth() !== m) date.setUTCDate(0)
	return date;
}

function startOfMonthUTC(date, count) {
	const moved = addMonthsUTC(date, count);
    const starting = Date.UTC(moved.getFullYear(), moved.getUTCMonth(), 1);
    return starting;
}

module.exports = ProgramsSchema;