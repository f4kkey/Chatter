import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/util.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        // console.log(fullName, email, password)
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        const user = User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email already exists" })
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashPassword,
        })

        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res)


            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePicture: newUser.profilePicture,
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (err) {
        console.log("Error in register controller:", err)
        res.status(500).json({ message: "Internal server error" })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        // console.log(user)
        const isPasswordRight = await bcrypt.compare(password, user.password);
        if (!isPasswordRight) return res.status(400).json({ message: "Invalid credentials" });

        generateToken(user._id, res)
        res.status(201).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
        })

    } catch (err) {
        console.log("Error in login controller:", err)
        res.status(500).json({ message: "Internal server error" })
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Log out succeed" })
    } catch (err) {
        console.log("Error in logout controller:", err)
        res.status(500).json({ message: "Internal server error" })
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePicture } = req.body;
        if (!profilePicture) res.status(400).json({ message: "Required profile picture" });

        const userID = req.user._id
        const uploadRes = await cloudinary.uploader.upload(profilePicture)
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { profilePicture: uploadRes.secure_url },
            { new: true }
        )
        res.status(200).json(updatedUser)
    } catch (err) {
        console.log("Error in logout controller:", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getme = async (req, res) => {
    return res.status(200).json(req.user)
}