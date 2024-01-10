const express = require('express')
const userRouter = require('./routes/user-routes');
const passport = require('passport');
const app = express()
const dotenv = require('dotenv')
const workRouter = require("./routes/work-routes");
const clientRouter = require('./routes/client-routes');
const jobRouter = require('./routes/job-routes')
dotenv.config()
//DB Connection
require('./models/db')

// Middleware
app.use(express.json())
app.use('/',userRouter)
app.use('/works',workRouter)
app.use('/client',clientRouter)
app.use('/job',jobRouter)
//Server listing
app.listen(8080,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("server is running on 8080")
})
