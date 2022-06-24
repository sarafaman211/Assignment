const express = require('express');
const colors = require('colors');
const dotEnv = require('dotenv');
const mongoDb = require('./db');
const cors = require("cors");

dotEnv.config({ path: "./.env" })

mongoDb();

const app = express();
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use("/api/user", require('./routes/user'))
app.use("/api/data", require('./routes/data'))
app.use("/api/fakeData", require("./routes/FakeData"))

app.listen(port, () => {
    console.log(`connected to server successfully on ${ port } and it is in ${ process.env.MODE } mode `. cyan.underline )
})