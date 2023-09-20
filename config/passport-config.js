const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Function to initialize Passport and configure local authentication strategy
function initialize(passport, getUserByEmail, getUserById) {
    // Function to authenticate users
    const authenticateUsers = async (email, password, done) => {
        // Get users by email
        const user = getUserByEmail(email);
        if (user == null) {
            // If no user is found with the provided email
            return done(null, false, { message: "No user found with that email" });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                // If the provided password matches the stored hashed password
                return done(null, user); // User is authenticated
            } else {
                // If the password is incorrect
                return done(null, false, { message: "Password Incorrect" });
            }
        } catch (e) {
            console.log(e);
            return done(e); // An error occurred during authentication
        }
    }

    // Configure Passport to use the LocalStrategy with the username field as 'email'
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUsers));

    // Serialize user to store in the session
    passport.serializeUser((user, done) => done(null, user.id));

    // Deserialize user to retrieve from the session
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

module.exports = initialize; // Export the initialize function
