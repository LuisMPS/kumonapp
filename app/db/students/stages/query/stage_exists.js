const {Stage, InvalidStageError} = require("../stage");
const Student = require("../../student");

const exists = new Stage("exists");
exists.register(existsHandler);

function existsHandler(target, values) {
	const formattedField = target.replace(/>/g , '.');
	const path = Student.schema.path(formattedField);
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

module.exports = exists;