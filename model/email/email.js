//package imports
const mongoose = require("mongoose");

//initialization
const { Schema } = mongoose;

//schema options
const SchemaOptions = {}

//schema
const EmailSchema = new Schema({
	email: {
		type: String,
		minLength: [5, "The minimum required length for email is 5 characters"],
		maxLength: [80, "The maximum required length for email is 80 characters"],
		match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Your email format should be __@_.__, instead got {VALUE}"],
		lowercase: true,
		trim: true,
		immutable: true,
		required: true,
	},
}, SchemaOptions);

//the model
const Quotation = mongoose.model("Quotation", EmailSchema)

//export 
module.exports = Quotation