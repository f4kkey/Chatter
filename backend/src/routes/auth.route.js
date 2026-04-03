import express from 'express';
import { getme, login, logout, register, updateProfile } from '../controllers/auth.controller.js';
import { authentication } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';
const router = express.Router();

// router.use(arcjetProtection)

router.post('/login', login);

router.post('/register', register);

router.post('/logout', logout);

router.post('/updateProfile', authentication, updateProfile);

router.get("/getme", authentication, getme)

export default router;