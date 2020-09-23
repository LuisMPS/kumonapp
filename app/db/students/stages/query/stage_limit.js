const {Stage, InvalidStageError} = require("../stage");
const {curry} = require("../functional");

const limitHandler = curry(delimiter => {
	return function(_target, values) {
        const value = Number(values[0]);
        if (value < 0) throw new InvalidStageError();
		const limit = {[delimiter]: value}
		return {limit};
	}
});

const delimiters = ["from", "to"];
const limitstages = delimiters.map(delimiter => {
    const limitstage = new Stage(delimiter);
	limitstage.register(limitHandler(delimiter));
	return limitstage;
});

const limit = new Stage("limit", ...limitstages);
module.exports = limit;