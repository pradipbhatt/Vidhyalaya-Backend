import mongoose from "mongoose";

// Define the User schema
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@fwu\.edu\.np$/, 'Email must end with @fwu.edu.np'], // Validate email format
    },
    password: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    userImage: {
        type: String, // URL of the user's image
        default: 'https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png' 
    }
});

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
