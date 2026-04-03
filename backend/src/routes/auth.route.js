import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/auth.controller.js';
import { authentication } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.post('/logout', logout);

router.post('/updateProfile', authentication, updateProfile);

export default router;