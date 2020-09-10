class Stage {
	constructor(id, ...substages) {
		this.id = id;
		const map = substages.map(substage => [substage.id, substage]);
		this.substages = new Map(map);
	}
	pipe(substages, value = "") {
		const next = substages[0];
		if (this.endpoint) return this.endpoint(next, value.split("|"));
		const nextstage = this.substages.get(next);
		if (!nextstage) {
			if (this.fallback) return this.fallback(next, value.split("|"));
			else throw new InvalidStageError();
		}
		const further = substages.slice(1);
		return nextstage.pipe(further, value);
	}
	register(endpoint) {
		this.endpoint = endpoint;
	}	
	setFallback(fallback) {
		this.fallback = fallback;
	}
}

class InvalidStageError extends Error { }

exports.Stage = Stage;
exports.InvalidStageError = InvalidStageError;