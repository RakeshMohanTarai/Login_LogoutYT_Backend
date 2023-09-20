// mongoose is a Node.js library that simplify intetaction with MongoDB

// Require the mongoose library
const mongoose = require('mongoose');
//require('mongoose') here, mongoose is the library name and require is the function name

// Connect to the MongoDB database named 'contact_list_db' on the localhost
mongoose.connect('mongodb://127.0.0.1:27017/Login_LogoutYT');
//const that we create in the previous step which is hold the mongoose library and connect is the 'function' and 
//"contact_list_mongodb" is the Project folder name or root folder name or directory name

// Acquire the connection (to check if it's successful)
const db = mongoose.connection;

// Event listener for 'error' event, will be triggered if there's an error in the connection (Optional)
db.on('error', function(err) {
    console.log(err.message); // Log the error message to the console
});

// Event listener for 'open' event, will be triggered once the connection is successfully established (Optional)
db.once('open', function() {
    console.log("Successfully connected to the database"); // Log the success message to the console
});
// Export the database connection object so that it can be used in other parts of the application
module.exports = db;
