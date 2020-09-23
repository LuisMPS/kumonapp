const {InvalidStageError} = require("../stage");
const {curry} = require("../functional");

const fallbackHandler = curry(Schema => {
	return function(target, values) {
		const formattedField = target.replace(/>/g , '.');
		const path = Schema.path(formattedField);
		if (!path) throw new InvalidStageError();
		const Type = path.options.type;
		const queries = values.map(value => {
			try { 
				const parsedValue = Type(value); 
				return {[formattedField]: {$eq: parsedValue}};
			} catch(e) { 
				throw new InvalidStageError(); 
			}
		});
		/* EXISTS CHECK NOT NECESSARY SINCE COMPARISON IS EQ */
		return {filters: {$or: queries}};
	}
});

module.exports = fallbackHandler;