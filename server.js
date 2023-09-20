// Load environment variables from a .env file if not in production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

// Import necessary libraries and modules
const express = require("express")
const app = express();
const bcrypt = require("bcrypt") // Importing bcrypt package for password hashing
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const passportLocal = require('./config/passport-config') // Import Passport configuration
const mongodb = require('connect-mongodb-session') // MongoDB session storage
const db = require("./config/mongoose") // Database configuration
const path = require('path')
const port = 8000;

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }))

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret key for session
    resave: false, // Don't resave the session if nothing is changed
    saveUninitialized: false
}))

// Initialize Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Enable HTTP method override for PUT and DELETE requests
app.use(methodOverride("_method"))

// Enable flash messages
app.use(flash());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Connect to the routers
app.use("/", require("./routers"))

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log("Server is now running on port no:", port);
});
