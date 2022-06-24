const jwt = require("jsonwebtoken")

const fetchuser = ( req, res, next ) => {

    const token = req.header("auth-token")
    if(!token){
        res.status(404).json({ error: "Token Dosen't match or found" })
    }

    const authToken = jwt.verify(token , process.env.TOKEN)
    req.user = authToken.user
    
    next()

}

module.exports = fetchuser