const {Stage} = require("../stage");

const report = new Stage("report");
report.register(reportHandler);

function reportHandler(target) {
	const path = ["programs", target, "report-src"];
	return path.join(".");
}

module.exports = report;