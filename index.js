const express = require("express")
const app = express()

const notes = [{
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


const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}.`)
})