const usersSchema = require("../DB/model/usersSchema.js");
const { generateAccessToken } = require("../utils/authentication");
const { hashPassword, comparePassword } = require("../utils/hashing");

const signup = async (req, res) => {
    try {
        const { email, name, password } = req.body

        const userExist = await usersSchema.findOne({ email })

        if (!email || !name || !password) return res.status(404).json({ msg: 'Fill out all fields!' })

        if (userExist) return res.status(401).json({ msg: 'Email already exist!' })

        const hashed = hashPassword(password)

        const user = await usersSchema({
            name,
            email,
            password: hashed,
            tasks: []
        }).save()

        const token = generateAccessToken(user)
        // console.log(token, hashed)

        if (!token) return res.status(401).json({ msg: 'Token is not generated!', token, user })

        if (user) {
            // console.log(user)
            res.cookie("user", token, { maxAge: 9000 })
            return res.status(201).json({ user, token, msg: 'Successful authentication!', error: "" })
        }
        return res.status(401).json({ msg: 'User already exists!' })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error, msg: 'Request Failed! Server Error!' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(404).json({ msg: 'Email or Password field can not be Empty!' })

        const user = await usersSchema.findOne({ email })
        console.log("user", user)
        if (!user) {
            return res.status(401).json({ msg: 'No such user exists!', error: "" })
        }

        const hashed = comparePassword(password, user.password)

        if (!hashed) return res.status(401).json({ msg: 'Wrong credential!', error: "" })

        const token = generateAccessToken(user)

        if (!token) return res.status(401).json({ msg: 'Token is not generated!', token, user })
        res.cookie("user", token, { maxAge: 9000 })
        return res.status(201).json({ msg: 'Login successful!', token, user })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error, msg: 'Request Failed! Server Error!' })
    }
}

module.exports = { signup, login }

// router.post("/signup", async (req, res) => {
//     try {
//         const { email, name, password } = req.body

//         if (!email || !name || !password) return res.status(404).json({ msg: 'Fill out all fields!' })
//         const hashed = hashPassword(password)

//         const user = await usersSchema({
//             name,
//             email,
//             password: hashed,
//             tasks: []
//         }).save()

//         const token = generateAccessToken(user)
//         console.log(token, hashed)

//         if (!token) return res.status(401).json({ msg: 'Token is not generated!', token, user })

//         if (user) {
//             console.log(user)
//             res.cookie("asw", "c", { maxAge: 9000 })
//             return res.status(201).json({ user, token, msg: 'Successful authentication!', error: "" })
//         }
//         console.log("rdga")
//         return res.status(401).json({ msg: 'User already exists!' })
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({ error, msg: 'Request Failed! Server Error!' })
//     }
// });

// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body

//         if (!email || !password) return res.status(404).json({ msg: 'Email or Password field can not be Empty!' })

//         const user = await usersSchema.findOne({ email: email })
//         console.log("user", user)
//         if (!user) {
//             return res.status(401).json({ msg: 'No such user exists!', error: "" })
//         }

//         const hashed = comparePassword(password, user.password)

//         if (!hashed) return res.status(401).json({ msg: 'Wrong credential!', error: "" })

//         const token = generateAccessToken(user)

//         if (!token) return res.status(401).json({ msg: 'Token is not generated!', token, user })

//         return res.status(201).json({ msg: 'Login successful!', token, user })
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({ error, msg: 'Request Failed! Server Error!' })
//     }
// });

