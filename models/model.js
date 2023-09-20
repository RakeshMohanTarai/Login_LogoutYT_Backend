// Require the 'mongoose' module to create and interact with MongoDB schemas and models
const mongoose = require('mongoose');

// Define the user schema using the 'mongoose.Schema' class
const userSchema = new mongoose.Schema({
      // 'name' field with type 'String', which is required
    name: {
        type: String,
        required: true
    },
    // 'email' field with type 'String', which is required and must be unique
    email: {
        type: String,
        required: true,
        unique: true
    },
    // 'password' field with type 'String', which is required
    password: {
        type: String,
        required: true
    }
}, {
    // Additional options for the schema
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields to the documents
});

// Create a Mongoose model named 'User' using the userSchema
// This model will interact with the 'users' collection in the MongoDB database
const User = mongoose.model('User', userSchema);

// Export the 'User' model so that it can be used in other parts of the application
module.exports = User;
