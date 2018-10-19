const http = require("http")

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

const app = http.createServer((req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json"
	})
	res.end(JSON.stringify(notes))
})

const port = 3000
app.listen(port)
console.log(`Server running on port ${port}.`)