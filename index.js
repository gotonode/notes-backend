const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")

app.use(bodyParser.json())
app.use(cors())
app.use(express.static("build"))

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config()
}

const Note = require("./models/note")

const formatNote = (note) => {
	return {
		content: note.content,
		date: note.date,
		important: note.important,
		id: note._id
	}
}

const formatNote2 = (note) => {
	const formattedNote = { ...note._doc,
		id: note._id
	}
	delete formattedNote._id
	delete formattedNote.__v

	return formattedNote
}

app.use(morgan(function (tokens, request, response) {
	return [
		tokens.method(request, response), // HTTP method
		tokens.url(request, response), // Relative URL
		JSON.stringify(request.body), // The JSON data
		tokens.res(request, response, "content-length"), // Length of content
		tokens.status(request, response), // HTTP status code
		"-",
		tokens["response-time"](request, response), "ms" // Response time in ms
	].join(" ")
}))

// const logger = (request, response, next) => {
// 	console.log("Method:   ", request.method)
// 	console.log("Path:     ", request.path)
// 	console.log("Body:     ", request.body)
// 	console.log("---")
// 	next()
// }

// app.use(logger)

app.get("/api/notes", (request, response) => {
	Note
		.find({}, {
			__v: 0
		})
		.then(notes => {
			response.json(notes.map(formatNote))
		})
})

app.get("/api/notes/:id", (request, response) => {
	Note
		.findById(request.params.id)
		.then(note => {
			if (note) {
				response.json(formatNote(note))
			} else {
				response.status(404).end()
			}
		}).catch(error => {
			console.log("Couldn't get note with ID " + request.params.id)
			response.status(400).send({
				error: "Malformed ID."
			})
		})
})

// const generateId = () => {
// 	const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a, b) => a - b).reverse()[0] : 1
// 	return maxId + 1
// }

app.post("/api/notes", (request, response) => {
	const body = request.body

	if (body.content === undefined) {
		return response.status(400).json({
			error: "Content is missing."
		})
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date()
	})

	note
		.save()
		.then(savedNote => {
			return formatNote(savedNote)
		}).then(savedAndFormattedNote => {
			response.json(savedAndFormattedNote)
		})
})

app.delete("/api/notes/:id", (request, response) => {
	Note
		.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		}).catch(error => {
			response.status(400).send({
				error: "Malformed ID."
			})
		})
})

app.put("/api/notes/:id", (request, response) => {
	const body = request.body
	const note = {
		content: body.content,
		important: body.important
	}

	Note
		.findByIdAndUpdate(request.params.id, note, {
			new: true
		})
		.then(updatedNote => {
			response.json(formatNote(updatedNote))
		}).catch(error => {
			response.status(400).send({
				error: "Malformed ID."
			})
		})
})

const error = (request, response) => {
	response.status(404).send({
		error: "Unknown endpoint."
	})
}

app.use(error)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}.`)
})