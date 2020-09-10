const {Stage, InvalidStageError} = require("../stage");
const Student = require("../../student");

const curry = fn => {
	const arity = fn.length;
	return function $curry(...args) {
		if (args.length < arity) return $curry.bind(null, ...args);
		else return fn.call(null, ...args);	
	}
}

const datehandler = curry((datepart, comparison) => {
	return function(target, values) {
		const formattedField = target.replace(/>/g , '.');
		const path = Student.schema.path(formattedField);
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

const comparedates = dateparts.map(datepart => {
	const dateparthandler = datehandler(datepart);
	const datestage = new Stage(datepart, ...comparisons.map(comparison => {
		const comparestage = new Stage(comparison);
		comparestage.register(dateparthandler(comparison));
		return comparestage;
	}));
	return datestage;
});

const dates = new Stage("date", ...comparedates);

module.exports = dates;
