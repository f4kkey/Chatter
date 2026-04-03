import express from 'express';
import { getAllContacts, getChatters, getMessages, sendMessage } from '../controllers/message.controller.js';
import { authentication } from '../middlewares/auth.middleware.js';

const router = express.Router();

// router.use(arcjetProtection)

router.get("/contacts", authentication, getAllContacts)

router.get("/chats", authentication, getChatters)

router.get("/:id", authentication, getMessages)

router.post("/send/:id", authentication, sendMessage)

export default router;