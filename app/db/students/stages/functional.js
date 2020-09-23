const curry = fn => {
	const arity = fn.length;
	return function $curry(...args) {
		if (args.length < arity) return $curry.bind(null, ...args);
		else return fn.call(null, ...args);	
	}
}

exports.curry = curry;