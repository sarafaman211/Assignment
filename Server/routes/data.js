const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Data = require("../models/Data");
const { body, validationResult } = require("express-validator");

// Router 1 get all the data from data base
router.get("/getData", fetchuser, async (req, res) => {


    try {
        let data = await Data.find({ user: req.user.id })

        res.json({ data })

    } catch (err) {
        console.error({ error: err.message })
        res.status(500).json({ error: "Internal Error" })
    }
})

// Router 2 add data in our data base
router.post('/addData', fetchuser, [
], async (req, res) => {

    try {

        const {fname, lname, email, password, address } = req.body

        let success = false

        const data = new Data({
            fname, lname, email, password, address, user: req.user.id
        })

        const savedData = await data.save()

        success = true

        res.json({ success, savedData })

    } catch (err) {
        console.error({ error: err.message })
        res.status(500).json({ error: "Internal Error" })
    }
})

// Router 3 update all data in our data base
router.put('/updateData/:id', fetchuser, async (req, res) => {

    try {

        const { fname, lname, email, password, address } = req.body

        let success = false

        const newData = {}
        if (fname) { newData.fname = fname }
        if (lname) { newData.lname = lname }
        if (email) { newData.email = email }
        if (password) { newData.password = password }
        if (address) { newData.address = address }

        let data = await Data.findById(req.params.id)
        if (!Data) {
            return res.status(400).json({ error: "not allowed" })
        }

        if (data.user.toString() !== req.user.id) {
            return res.status(404).json({ error: "Not found" })
        }

        data = await Data.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true })

        success = true

        res.json({ success, data })


    } catch (err) {
        console.error({ error: err.message })
        res.status(500).json({ error: "Internal Error" })
    }
})

// Router 4 delete data from our data base
router.delete('/deleteData/:id', fetchuser, async (req, res) => {

    try {

        let success = false

        let data = await Data.findById(req.params.id)
        if (!Data) {
            return res.status(400).json({ error: "Item deleted" })
        }

        data = await Data.findByIdAndDelete(req.params.id)

        success = true

        res.json({ success, data })

    } catch (err) {
        console.error({ error: err.message })
        res.status(500).json({ error: "Internal Error" })
    }
})

module.exports = router;