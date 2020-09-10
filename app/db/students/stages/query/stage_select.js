const {Stage, InvalidStageError} = require("../stage");
const Student = require("../../student");

const select = new Stage("select");
select.register(selectHandler);

function selectHandler(target, values) {
	const formattedField = target.replace(/>/g , '.');
	const path = Student.schema.path(formattedField);
    if (!path) throw new InvalidStageError();
    try {
        const isIncluded = Number(values[0]);
        const selection = {[formattedField]: isIncluded}
        return {select: selection};
    } catch (e) { 
        throw new InvalidStageError(); 
    }
}

module.exports = select;