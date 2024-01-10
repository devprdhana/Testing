const express = require('express')
const userRouter = require('./routes/user-routes');
const passport = require('passport');
const app = express()
const dotenv = require('dotenv')
const workRouter = require("./routes/work-routes");
dotenv.config()
//DB Connection
require('./models/db')

// Middleware
app.use(express.json())
app.use('/',userRouter)
app.use('/works',workRouter)
//Server listing
app.listen(8080,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("server is running on 8080")
})
