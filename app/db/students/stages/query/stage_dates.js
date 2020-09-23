const {Stage, InvalidStageError} = require("../stage");
const {curry} = require("../functional");

const dateHandler = curry((datepart, comparison, Schema) => {
	return function(target, values) {
		const formattedField = target.replace(/>/g , '.');
		const path = Schema.path(formattedField);
		if (!path) throw new InvalidStageError();
		const type = path.options.type;
		if (type !== Date) throw new InvalidStageError();
		const datequery = `$${datepart}`;
		const comparisonquery =  `$${comparison}`;
		const queries = values.map(value => {
			const parsedValue = datepart === "toDate" ? new Date(value) : Number(value);
			return {[comparisonquery]: [{[datequery]: `$${formattedField}`}, parsedValue]};
		});
		const filters = {$and: []};
		filters.$and.push({[formattedField]: {$exists: true}});
		filters.$and.push({$expr: {$or: queries}})
		return {filters};		
	}
});

const dateparts = ["year", "month", "dayOfMonth", "toDate"];
const comparisons = ["eq", "ne", "gt", "lt"];

const dateIn = Schema => {
	const comparedates = dateparts.map(datepart => {
		const datepartHandler = dateHandler(datepart);
		const datestage = new Stage(datepart, ...comparisons.map(comparison => {
			const comparisonHandler = datepartHandler(comparison);
			const comparestage = new Stage(comparison);
			comparestage.register(comparisonHandler(Schema));
			return comparestage;
		}));
		return datestage;
	});
	const dates = new Stage("date", ...comparedates);
	return dates;
}

module.exports = dateIn;
