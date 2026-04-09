import jwt, { decode } from "jsonwebtoken"
import User from "../models/User.js"

export const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken
        // console.log(token)
        if (!token) return res.status(401).json({ message: "No token provided" })

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) return res.status(401).json({ message: "Invalid token" })
        // console.log(decoded)
        const user = await User.findById(decoded.userID).select("-password")
        if (!user) return res.status(401).json({ message: "User not found" })

        req.user = user
        next()
    } catch (err) {
        console.log("Error in authentication:", err)
        res.status(500).json({ message: "Internal server error" })
    }
}