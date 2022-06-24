const express = require("express")
const router = express.Router()
const fake = require('faker');
const fetchuser = require("../middleware/fetchuser");
const fakeee = require("../models/FakeData");

router.get('/getfake',(req,res)=>{
    const fake = fakeee.find()
    res.json({ fake })
});

router.post("/data", (req, res) => {
    try {
        for(let i=0;i<10;i++){
                    const fakee =  new fakeee({
                        firstname:fake.name.firstName(),
                        lastname:fake.name.lastName(),
                        address:fake.address.city(),
                        email:fake.internet.email(),
                        password:fake.internet.password(),
                    });
                   
                 const savedfake = fakee.save()
                 res.json({ savedfake })
                }
        
    } catch (err) {
        console.error({ error: err.message })
        res.status(500).json({ error: "INTERNAL ERROR OCCURED" })
    }
})

module.exports = router