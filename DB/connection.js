const dotenv = require("dotenv");
dotenv.config({ path: './.env' })

const mongoose = require("mongoose");

const DB_uri = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(DB_uri, {

}).then(() => {
    console.log("MongoDB connected!")
}).catch((error) => console.log(error))