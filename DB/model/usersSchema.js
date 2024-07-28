const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String
        },
        status: {
            type: String,
            required: true
        },
        priority: {
            type: String
        },
        deadline: {
            type: String
        }

    }, {
    timestamps: true
})

const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [taskSchema]
}, {
    timestamps: true
})

const usersSchema = mongoose.model("users", user)

module.exports = usersSchema