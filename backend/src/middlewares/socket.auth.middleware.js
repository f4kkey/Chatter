import jwt, { decode } from "jsonwebtoken"
import User from "../models/User.js"

export const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie?.split('; ').find((row) => row.startsWith('accessToken='))?.split('=')[1]

        if (!token) {
            console.log("Socket connection rejected: No token")
            return next(new Error("No token provided"))
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) {
            console.log("Socket connection rejected: Invalid token")
            return next(new Error("Invalid provided"))
        }

        const user = await User.findById(decoded.userID).select("-password")
        if (!user) {
            console.log("Socket connection rejected: User not found")
            return next(new Error("User not found"))
        }
        socket.user = user;
        socket.userID = user._id.toString()
        next()

    } catch (error) {
        console.log("Error in socket authentication:", error)
        next(new Error("Authentication failed"))
    }
}