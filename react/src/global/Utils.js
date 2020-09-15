function addMonthsUTC(date, count) {
	let m, d = (date = new Date(date)).getUTCDate() 
	date.setUTCMonth(date.getUTCMonth() + count, 1)
	m = date.getUTCMonth()
	date.setUTCDate(d)
	if (date.getUTCMonth() !== m) date.setUTCDate(0)
	return date;
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export {addMonthsUTC, isEmpty};