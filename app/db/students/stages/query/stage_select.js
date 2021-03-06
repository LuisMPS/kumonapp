const {Stage, InvalidStageError} = require("../stage");
const {curry} = require("../functional");

const selectHandler = curry(Schema => {
    return function(target, values) {
        const formattedField = target.replace(/>/g , '.');
        const path = Schema.path(formattedField);
        if (!path) throw new InvalidStageError();
        try {
            const isIncluded = Number(values[0]);
            const selection = {[formattedField]: isIncluded}
            return {select: selection};
        } catch (e) { 
            throw new InvalidStageError(); 
        }
    }
});

const selectIn = Schema => {
	const select = new Stage("select");
	select.register(selectHandler(Schema));
	return select;
};

module.exports = selectIn;