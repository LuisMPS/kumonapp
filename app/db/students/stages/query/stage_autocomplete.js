const {Stage, InvalidStageError} = require("../stage");
const Student = require("../../student");

const autocomplete = new Stage("autocomplete");
autocomplete.register(autocompleteHandler);

function autocompleteHandler(target, values) {
	const formattedField = target.replace(/>/g , '.');
	const path = Student.schema.path(formattedField);
	if (!path) throw new InvalidStageError();
	const type = path.options.type;
	if (type !== String) throw new InvalidStageError(); 
	const queries = values.map(value => {
		const expression = value.replace(/[-\/\\^*+?.()|[\]{}]/g, '\\$&');	
		return {[formattedField]: {$regex: `^${expression}`, $options: `i`}};
	});
	return {filters: {$or: queries}};
}

module.exports = autocomplete;