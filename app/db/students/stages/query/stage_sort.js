const {Stage, InvalidStageError} = require("../stage");
const {curry} = require("../functional");

const sortHandler = curry(Schema => {
    return function(target, values) {
        const formattedField = target.replace(/>/g , '.');
        const path = Schema.path(formattedField);
        if (!path) throw new InvalidStageError();
        try {
            const order = Number(values[0]);
            const sort = {[formattedField]: order};
            return {sort};
        } catch (e) { 
            throw new InvalidStageError(); 
        }
    }
});

const sortIn = Schema => {
	const sort = new Stage("sort");
	sort.register(sortHandler(Schema));
	return sort;
};

module.exports = sortIn;