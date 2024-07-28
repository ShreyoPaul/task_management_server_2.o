import dotenv from 'dotenv'
dotenv.config({path: '.env'})
import express from 'express'
import cors from 'cors'
import allRoutes from "./routes/allRoutes.js"
import './DB/connection.js'

const app = express()
const PORT = 8001

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"]
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", allRoutes)


app.listen(process.env.PORT || PORT, ()=> {
    console.log("Server is running on port", PORT)
})