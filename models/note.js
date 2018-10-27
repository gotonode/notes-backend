const mongoose = require("mongoose")

const url = "mongodb://admin:<dbpassword>@ds125302.mlab.com:25302/notes"

mongoose.connect(url)

const Note = mongoose.model("Note", {
	content: String,
	date: Date,
	important: Boolean
})

module.exports = Note