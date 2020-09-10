const {Stage, InvalidStageError} = require("../stage");
const Student = require("../../student");

const comparisons = ["gt", "lt", "eq", "ne"];
const comparestages = comparisons.map(comparison => {
	const comparestage = new Stage(comparison);
	comparestage.register(compareHandler(comparison));
	return comparestage;
});

const compare = new Stage("compare", ...comparestages);

function compareHandler(comparison) {
	return function(target, values) {
		const formattedField = target.replace(/>/g , '.');
		const fieldpath = Student.schema.path(formattedField);
		if (!fieldpath) throw new InvalidStageError();
		const FieldType = fieldpath.options.type;
		const queries = values.map(value => {
			const formattedValue = value.replace(/>/g , '.');
			const valuepath = Student.schema.path(formattedValue);
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
}

module.exports = compare;