const {Stage, InvalidStageError} = require("../stage");
const {curry} = require("../functional");

const compareHandler = curry((comparison, Schema) => {
	return function(target, values) {
		const formattedField = target.replace(/>/g , '.');
		const fieldpath = Schema.path(formattedField);
		if (!fieldpath) throw new InvalidStageError();
		const FieldType = fieldpath.options.type;
		const queries = values.map(value => {
			const formattedValue = value.replace(/>/g , '.');
			const valuepath = Schema.path(formattedValue);
			const comparisonquery = `$${comparison}`;
			if (!valuepath) {
				const parsedValue = FieldType(formattedValue);
				return {[formattedField]: {[comparisonquery]: parsedValue}};
			}
			const filterValue = {$and: []};
			filterValue.$and.push({[formattedValue]: {$exists: true}});
			filterValue.$and.push({$expr: {[comparisonquery]: [`$${formattedField}`, `$${formattedValue}`]}});
			return filterValue;
		});
		const filterField = {$and: []};
		filterField.$and.push({[formattedField]: {$exists: true}});
		filterField.$and.push({$or: queries})
		return {filters: filterField};
	}
});

const comparisons = ["gt", "lt", "eq", "ne"];

const compareIn = Schema => {
	const comparestages = comparisons.map(comparison => {
		const comparisonHandler = compareHandler(comparison);
		const comparestage = new Stage(comparison);
		comparestage.register(comparisonHandler(Schema));
		return comparestage;
	});
	const compare = new Stage("compare", ...comparestages);
	return compare;
};

module.exports = compareIn;