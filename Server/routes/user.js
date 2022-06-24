const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');


// Router 1 create the user first 
router.post("/createUser", [
    body('name', "Write your name").isLength({ min: 3 }),
    body('email', "complete your credentials").isEmail(),
    body("password", " fill credentials ").isLength({ min: 4 })
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: "Some credentials were left so please fill them up" })
    }

    try {

        let success = false
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Email Already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, process.env.TOKEN)

        success = true

        res.json({ success, user, authToken })

    } catch (err) {
        console.error({ error: err.message })
        res.status(500).json({ error: "Internal Error Occured" })
    }

});


// ROuter 2 validate the creadentials here 
router.post("/validate", [
    body("email", "fill the credentialss").isEmail(),
    body("password", "fill the correct credentials").isLength({ min: 4 })
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: "Some credentials were left so please fill them up" })
    }

    try {

        let success = false

        const { email, password } = req.body

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: 'No user found' })
        }

        const comparePW = await bcrypt.compare(password, user.password)
        if (!comparePW) {
            return res.status(400).json({ success, error: "password dosen't match" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, process.env.TOKEN)

        success = true

        res.json({ success, authToken })

    } catch (err) {
        console.error({ error: err.message })
        res.status(500).json({ error: "Internal Error Occured" })
    }

});

// ROuter 3 get all the user by a particular id 
router.get("/getUser", fetchuser, async (req, res) => {

    try {

        let success = false;

        const userId = req.user.id
        const user = await User.findById(userId).select("-password")

        success = true

        res.json({ user, success })

    } catch (err) {
        console.error({ error: err.message })
        res.status(500).json({ error: "Internal Error" })
    }

})

// Router 4 get all the user info for admin side
router.get('/allUsers', async (req, res) => {

    try {

        let success = false

        const user = await User.find()

        success = true

        res.json({ user, success })

    } catch (err) {
        console.error({ error: err.message })
        res.status(500).json({ error: "INTERNAL ERROR OCCURED" })
    }
})

// ROuter 5 delete the user from data base in our admin dashboard
router.delete('/deleteUser/:id', async (req, res) => {

    try {

        let success = false

        let user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).json({ error: "User deleted" })
        }

        user = await User.findByIdAndDelete(req.params.id)

        success = true

        res.json({ success, user })

    } catch (err) {
        console.error({ error: err.message })
        res.status(500).json({ error: "INTERNAL ERROR OCCURED" })
    }
})

module.exports = router