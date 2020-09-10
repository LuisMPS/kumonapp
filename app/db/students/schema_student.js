const Schema = require('mongoose').Schema;
const ProgramsSchema = require("./schema_programs");

const StudentSchema = new Schema(
	{
		uuid: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		lastname: {
			type: String,
			required: true
		},
		fullname: {
			type: String,
			default: function() {
				return `${this.name} ${this.lastname}`;
			}
		},
		birth: {
			type: Date,
			required: true
		},
		programs: {
			type: ProgramsSchema,
			default: {}
		},
		'photo-src': {
			type: String,
			default: ''
		}
	}, {versionKey: false}
);

StudentSchema.pre("save", function(next) {
	this.fullname = `${this.name} ${this.lastname}`;
	next();
});

module.exports = StudentSchema;