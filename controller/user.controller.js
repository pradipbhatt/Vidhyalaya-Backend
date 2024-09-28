import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

// Signup controller to create a new user (admin only)
export const signup = async (req, res) => {
    try {
        const { fullname, email, password, registrationNumber, userImage } = req.body;

        const emailRegex = /\S+@fwu\.edu\.np$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Email must end with @fwu.edu.np" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { registrationNumber }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email or registration number" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname,
            email,
            password: hashPassword,
            registrationNumber,
            isAdmin: false,
            userImage: userImage || '',
        });

        await createdUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                registrationNumber: createdUser.registrationNumber,
                isAdmin: createdUser.isAdmin,
                userImage: createdUser.userImage,
            },
        });
    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login controller to authenticate a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                registrationNumber: user.registrationNumber,
                isAdmin: user.isAdmin,
                userImage: user.userImage,
            },
        });
    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to get all users (admin only)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to get user details by ID
export const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                registrationNumber: user.registrationNumber,
                isAdmin: user.isAdmin,
                userImage: user.userImage,
            },
        });
    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete controller to remove a user (admin only)
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to update user details (admin only)
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id; // User ID from route parameter
        const { fullname, email, password, registrationNumber, isAdmin, userImage } = req.body;

        // Validate email format
        const emailRegex = /\S+@fwu\.edu\.np$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ message: "Email must end with @fwu.edu.np" });
        }

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (registrationNumber) user.registrationNumber = registrationNumber;
        if (password) user.password = await bcryptjs.hash(password, 10); // Hash the new password
        if (isAdmin !== undefined) user.isAdmin = isAdmin; // Ensure isAdmin is set only if provided
        if (userImage) user.userImage = userImage; // Update user image

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                registrationNumber: user.registrationNumber,
                isAdmin: user.isAdmin,
                userImage: user.userImage,
            },
        });
    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
