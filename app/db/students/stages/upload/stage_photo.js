const {Stage} = require("../stage");

const photo = new Stage("photo");
photo.register(photoHandler);

function photoHandler() {
	const path = ["photo-src"];
	return path.join(".");	
}

module.exports = photo;