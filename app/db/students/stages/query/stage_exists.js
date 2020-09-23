const {Stage, InvalidStageError} = require("../stage");
const {curry} = require("../functional");

const existsHandler = curry(Schema => {
    return function(target, values) {
        const formattedField = target.replace(/>/g , '.');
        const path = Schema.path(formattedField);
        if (!path) throw new InvalidStageError();
        try {
            const exists = Boolean(Number(values[0]));
            const comparison = exists ? "$ne" : "$eq";
            const filterField = {[formattedField]: {[comparison]: null}}
            return {filters: filterField};
        } catch (e) { 
            throw new InvalidStageError(); 
        }
    }
});

const existsIn = Schema => {
	const exists = new Stage("exists");
	exists.register(existsHandler(Schema));
	return exists;
};

module.exports = existsIn;