import { Server } from "socket.io"
import http from 'http'
import express from 'express'
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js"

const app = express()
const server = http.createServer(app)

const socketSV = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true,
    },
})

socketSV.use(socketAuthMiddleware)

const userSocketMap = {};

socketSV.on('connection', (socket) => {
    console.log("A user connected: ", socket.user.fullName)
    const userID = socket.userID
    userSocketMap[userID] = socket.id

    socketSV.emit('toOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log("A user disconnected: ", socket.user.fullName)
        delete userSocketMap[userID]
        socketSV.emit('toOnlineUsers', Object.keys(userSocketMap))
    })
})

export { socketSV, app, server }
