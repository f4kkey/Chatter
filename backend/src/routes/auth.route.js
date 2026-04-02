import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
    // Handle login logic here
    res.send('Login route');
});

router.post('/register', (req, res) => {
    // Handle registration logic here
    res.send('Register route');
});

router.post('/logout', (req, res) => {
    // Handle logout logic here
    res.send('Logout route');
});
export default router;