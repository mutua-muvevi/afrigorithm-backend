//package imports
const mongoose = require("mongoose");

//initialization
const { Schema } = mongoose;

//schema options
const SchemaOptions = {}

//schema
const UserSchema = new Schema({
	email: String,
	picture: String,
}, SchemaOptions)

//model
const User = mongoose.model("User", UserSchema);

//export
module.exports = User;