const express = require("express");
const app = express();

// Routes

// Render the index page if the user is authenticated
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", { name: req.user.name });
})

// Render the login page if the user is not authenticated
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs");
})

// Render the registration page if the user is not authenticated
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
})

// Middleware to check if the user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, continue to the next route handler
    }
    res.redirect("/login"); // Redirect to the login page if not authenticated
}

// Middleware to check if the user is not authenticated
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/"); // Redirect to the home page if authenticated
    }
    next(); // User is not authenticated, continue to the next route handler
}

module.exports = app; // Export the Express app
