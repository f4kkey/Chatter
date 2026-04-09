import express from 'express';
import { getAllContacts, getChatters, getMessages, sendMessage, getUnreadUsers } from '../controllers/message.controller.js';
import { authentication } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection)

router.get("/contacts", authentication, getAllContacts)

router.get("/chats", authentication, getChatters)

router.get("/unread", authentication, getUnreadUsers)

router.get("/:id", authentication, getMessages)

router.post("/send/:id", authentication, sendMessage)

export default router;