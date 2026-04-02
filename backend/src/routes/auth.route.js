import express from 'express';
import { login, register } from '../controllers/auth.controller';
const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.post('/logout', (req, res) => {
    // Handle logout logic here
    res.send('Logout route');
});
export default router;