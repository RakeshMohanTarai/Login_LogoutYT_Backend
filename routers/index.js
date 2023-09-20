const express = require("express");
const app = express();
const passport = require("passport");
const bcrypt = require("bcrypt");
const initializePassport = require('../config/passport-config'); // Adjust the path as needed
const User = require('../models/model'); 
const path = require("path")

// Initialize Passport with custom functions for user retrieval
initializePassport(
    passport,
    email => users.find(user => user.email === email), // Function to find a user by email
    id => users.find(user => user.id === id) // Function to find a user by ID
)

const users = [] // Array to store user data (temporary)

app.use(passport.initialize()) 

// Middleware to check if the user is authenticated
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

// Middleware to check if the user is not authenticated
function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

// Handling POST request for user login
app.post("/login", checkNotAuthenticated, async (req, res) => {
    // Check if email and password fields are empty
    if (!req.body.email || !req.body.password) {
        req.flash("error", "Missing Credentials"); // Flash message for missing credentials
        return res.render('login', { error: 'Missing Credentials' }); // Render the login page with an error message
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (user) {
            // User with the provided email exists, now check the password
            console.log("Here are the logged in user details", user);
            console.log(user.name);
            if (user.password === req.body.password) {
                // Password is valid, redirect to a success page or perform other actions
                return res.render('index', { name: user.name }); // Render the index page with user's name
            } else {
                // Password is incorrect, redirect back to the login page with an error message
                req.flash("error", "Wrong Password"); // Flash message for wrong password
                return res.render('login', { error: 'Incorrect password' }); // Render the login page with an error message
            }
        } else {
            // User with the provided email doesn't exist, redirect back to the login page with an error message
            req.flash("error", "No user found with that email"); // Flash message for user not found
            return res.render('login', { error: 'User not found' }); // Render the login page with an error message
        }
    } catch (error) {
        console.error('Error in signing up:', error);
        // Handle the error as needed, e.g., sending an error response or rendering an error page
        return res.status(500).send('Internal Server Error');
    }
})

// Configure the path directory of the routers so the index.js functions use the router.js file
app.get("/", require("./router")) // Handle GET request for the root path
app.get("/login", require("./router")) // Handle GET request for the login path
app.get("/register", require("./router")) // Handle GET request for the register path

// Handling POST request for user registration
app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            const newUser = await User.create(req.body); // Create a new user with the provided data
            return res.redirect('/login'); // Redirect to the login page after successful registration
        } else {
            // If a user with the provided email already exists, redirect back to the sign-up page
            req.flash("error", "User with this email already exists"); // Flash message for existing user
            return res.redirect('back'); // Redirect back to the previous page
        }
    } catch (error) {
        console.error('Error in signing up:', error);
        // Handle the error as needed, e.g., sending an error response or rendering an error page
        return res.status(500).send('Internal Server Error');
    }
})

// Handling DELETE request for user logout
app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/") // Redirect to the root path after successful logout
    })
})

module.exports = app; // Export the Express app
