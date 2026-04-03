import { generateToken } from "../lib/util.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const login = async (req, res) => {
    const { fullName, email, password } = req.body;
};

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
            generateToken(newUser._id, res)
            await newUser.save();

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
        console.log("Error in register controller: ", err)
        res.status(500).json({ message: "Internal server error" })
    }
};