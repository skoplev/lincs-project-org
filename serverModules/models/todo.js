var mongoose = require("mongoose");

// Register Mongoose data model. Encapsulates the database connection.
module.exports = mongoose.model("Todo", {
	text: String
});
