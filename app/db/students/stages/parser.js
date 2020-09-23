function queryParser(entry, query) {
	return Object.keys(query).reduce((asked, key) => {
		const stages = key.split("_");
		const queried = entry.pipe(stages, query[key]);
		parser.integrate(asked, queried);
		return asked;
	}, {});
}

class Parser {
	constructor() { 
		this.integrators = new Map();
	}
	integrateAs(key, integrator) {
		this.integrators.set(key, integrator);
	}
	integrateRest(integrator) {
		this.fallback = integrator;
	}
	integrate(asked, queried) {
		Object.keys(queried).forEach(key => {
			if (!asked[key]) asked[key] = {};
			const integrator = this.integrators.get(key) || this.fallback;
			integrator(asked[key], queried[key]);
		});
	}
}

const integratorFilters = (askedValue, queriedValue) => {
	askedValue.$and = askedValue.$and ? [...askedValue.$and, queriedValue] : [queriedValue]; 	
}
const integratorRest = (askedValue, queriedValue) => {
	Object.assign(askedValue, queriedValue);
};

const parser = new Parser();
parser.integrateAs("filters", integratorFilters);
parser.integrateRest(integratorRest);

module.exports = queryParser;