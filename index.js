const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")

app.use(bodyParser.json())
app.use(cors())

app.use(morgan(function (tokens, req, res) {
	return [
		tokens.method(req, res), // HTTP method
		tokens.url(req, res), // Relative URL
		JSON.stringify(req.body), // The JSON data
		tokens.res(req, res, 'content-length'), // Length of content
		tokens.status(req, res), // HTTP status code
		'-',
		tokens['response-time'](req, res), 'ms' // Response time in ms
	].join(' ')
}))

// const logger = (request, response, next) => {
// 	console.log("Method:   ", request.method)
// 	console.log("Path:     ", request.path)
// 	console.log("Body:     ", request.body)
// 	console.log("---")
// 	next()
// }

// app.use(logger)

let notes = [{
		id: 1,
		content: "First",
		date: "2018",
		important: true
	},
	{
		id: 2,
		content: "Second",
		date: "2018",
		important: true
	},
	{
		id: 3,
		content: "Third",
		date: "2018",
		important: true
	},
]

app.get('/', (req, res) => {
	res.send("<h1>Hello, world!</h1>")
})

app.get('/notes', (req, res) => {
	res.json(notes)
})

app.get('/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	const note = notes.find(note => {
		// console.log(note.id, typeof note.id, id, typeof id, note.id === id)
		return note.id === id
	})

	if (note) {
		res.json(note)
	} else {
		res.status(404).end()
	}
})

const generateId = () => {
	const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a, b) => a - b).reverse()[0] : 1
	return maxId + 1
}

app.post('/notes', (req, res) => {
	const body = req.body
	//console.log(note)
	//console.log(req.headers)

	if (body.content === undefined) {
		return res.status(400).json({
			error: "Content is missing."
		})
	}

	const note = {
		content: body.content,
		important: body.important || false,
		date: new Date(),
		id: generateId()
	}

	notes = notes.concat(note)

	res.json(note)
})

app.delete('/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	notes = notes.filter(note => note.id !== id)

	res.status(204).end()
})

const error = (request, response) => {
	response.status(404).send({
		error: "Unknown endpoint."
	})
}

app.use(error)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}.`)
})