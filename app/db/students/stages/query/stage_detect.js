const {Stage, InvalidStageError} = require("../stage");
const {curry} = require("../functional");

const detectHandler = curry(Schema => {
	return function (target, values) {
		const formattedField = target.replace(/>/g , '.');
		const path = Schema.path(formattedField);
		if (!path) throw new InvalidStageError();
		const type = path.options.type;
		if (type !== String) throw new InvalidStageError(); 
		const queries = values.map(value => {
			const expression = matcher(value);
			return {[formattedField]: {$regex: expression, $options: `ig`}};
		});
		return {filters: {$or: queries}};
	}
});

function matcher(value) {
	const diactricAdder = diacritic => match => `(${match}|${`${match}${diacritic}`.normalize("NFC")})`;
	const normalized = value.normalize("NFD");
	const unaccented = normalized.replace(/[\u0300-\u036f]/g, "");
	const accented = unaccented.replace(/[aeiou]/ig, diactricAdder(`\u0301`));
	const tilded = accented.replace(/n/ig, diactricAdder(`\u0303`));
	return tilded;
}

const detectIn = Schema => {
	const detect = new Stage("detect");
	detect.register(detectHandler(Schema));
	return detect;
};

module.exports = detectIn;