const mongoose = require("mongoose")

const url = "mongodb://admin:<dbpassword>@ds125302.mlab.com:25302/notes"

mongoose.connect(url)

const Note = mongoose.model("Note", {
    content: String,
    date: Date,
    important: Boolean
})

const argContent = process.argv[2]

if (argContent !== undefined) {

    const note = new Note({
        content: argContent,
        date: new Date(),
        important: true
    })
    note
        .save()
        .then(response => {
            console.log("Note saved:", JSON.stringify(response))
            mongoose.connection.close()
        })

} else {

    Note
        .find({}).then(result => {
            result.forEach(note => {
                console.log(JSON.stringify(note))
            })
            mongoose.connection.close()
        })
}