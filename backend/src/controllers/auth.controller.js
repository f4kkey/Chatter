import User from "../models/User";

export const login = async (req, res) => {
    const { fullName, email, password } = req.body;
};

export const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        const user = User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email already exists" })
    } catch (err) {

    }
};