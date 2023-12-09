const express = require("express")
const cors = require("cors")
const path = require("path")
const routes = require("./routes")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()
const PORT = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/api", routes)
app.listen(PORT, () => {
	console.log("Server is running", PORT)
})
