const express = require('express');

const env = require('dotenv').config();

const port = 5000;

const app = express();
const db = require("./config/mongoose");
const path = require('path');
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// used for session cookie
app.use(cookieParser())
const passport = require('passport');
const session = require('express-session');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-auth2-strategy');
// const flash = require('connect-flash');
const flash = require('express-flash');
const customMware = require('./config/flashMiddleware');


app.use('/assets', express.static(process.env.asset_path));

const MongoStore = require('connect-mongo');
const mongodb = require('mongodb');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.set("view engine", "ejs");
app.set('views', './views');


app.use(session({
    name: process.env.db,
    secret: process.env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 5),
        secure: false
    }
    ,
    store: MongoStore.create(
        {
            mongoUrl: process.env.DB_URL, // Use this line to specify the Mongoose connection
            autoRemove: 'disabled',
            dbName: 'Authentication',
            client: mongodb.MongoClient
        },
        (err) => {
            console.log(err || 'connect-mongodb setup ok');
        })
}));

app.use(passport.initialize());
app.use(passport.session()); ``

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require('./routes/index'));



app.listen(port, ((err) => {
    if (err) { console.log("Error in firing the server") };
    console.log("Server is running sucessfully");
}));