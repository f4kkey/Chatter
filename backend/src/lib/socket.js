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

const userSocketMap = new Map();

socketSV.on('connection', (socket) => {
    console.log("A user connected: ", socket.user.fullName)
    const userID = socket.userID
    const sockets = userSocketMap.get(userID) ?? new Set()
    sockets.add(socket.id)
    userSocketMap.set(userID, sockets)

    socketSV.emit('toOnlineUsers', [...userSocketMap.keys()])

    socket.on('disconnect', () => {

        const sockets = userSocketMap.get(userID)
        if (sockets) {
            sockets.delete(socket.id)
            if (sockets.size === 0) {
                console.log("A user disconnected: ", socket.user.fullName)
                userSocketMap.delete(userID)
            }
        }
        socketSV.emit('toOnlineUsers', [...userSocketMap.keys()])
    })
})

export { socketSV, app, server }
