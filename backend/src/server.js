import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './lib/db.js'

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json({ limit: "5MB" }))
app.use(morgan("dev"))
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectDB();
});