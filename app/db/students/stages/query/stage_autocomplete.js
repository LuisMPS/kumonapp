const {Stage, InvalidStageError} = require("../stage");
const {curry} = require("../functional");

const autocompleteHandler = curry(Schema => {
	return function(target, values) {
		const formattedField = target.replace(/>/g , '.');
		const path = Schema.path(formattedField);
		if (!path) throw new InvalidStageError();
		const type = path.options.type;
		if (type !== String) throw new InvalidStageError(); 
		const queries = values.map(value => {
			const expression = value.replace(/[-\/\\^*+?.()|[\]{}]/g, '\\$&');	
			return {[formattedField]: {$regex: `^${expression}`, $options: `i`}};
		});
		return {filters: {$or: queries}};
	}
});

const autocompleteIn = Schema => {
	const autocomplete = new Stage("autocomplete");
	autocomplete.register(autocompleteHandler(Schema));
	return autocomplete;
};

module.exports = autocompleteIn;