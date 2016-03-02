// app/models/user.js

var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");  // encryption of passwords

// Users
var userSchema = mongoose.Schema({
	local: {
		email: String,
		password: String
	}
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
}

// Expose user schema
module.exports = mongoose.model("User", userSchema);