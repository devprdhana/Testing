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


// const express = require('express');
// const passport = require('passport');
// const cookieSession = require('cookie-session');
// require('./passport');

// const app = express();

// app.use(cookieSession({
//   name: 'google-auth-session',
//   keys: ['key1', 'key2']
// }))

// const isLoggedIn = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// }

// app.use(passport.initialize());
// app.use(passport.session());

// const port = process.env.PORT || 5000

// app.get("/", (req, res) => {
//     res.json({message: "You are not logged in"})
// })

// app.get("/failed", (req, res) => {
//     res.send("Failed")
// })
// app.get("/success",isLoggedIn, (req, res) => {
//     res.send(`Welcome ${req.user.email}`)
// })

// app.get('/google',
//     passport.authenticate('google', {
//             scope:
//                 ['email', 'profile']
//         }
//     ));

// app.get('/google/callback',
//     passport.authenticate('google', {
//         failureRedirect: '/failed',
//     }),
//     function (req, res) {
//         res.redirect('/success')

//     }
// );

// app.get("/logout", (req, res) => {
//     req.session = null;
//     req.logout();
//     res.redirect('/');
// })

// app.listen(port, () => console.log("server running on port" + port))
