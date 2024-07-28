const dotenv = require('dotenv')
dotenv.config({ path: '.env' })
const express = require('express')
const cors = require('cors')
const allRoutes = require("./routes/allRoutes.js")
require('./DB/connection')

const app = express()
const PORT = 8001

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", allRoutes)


app.listen(process.env.PORT || PORT, () => {
    console.log("Server is running on port", PORT)
})
