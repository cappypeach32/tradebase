const express = require('express');
const router = express.Router();

let users = [];

// Register
router.post('/register', (req,res)=>{
    const { email, username, password } = req.body;
    const user = { id: users.length+1, email, username, password_hash: password, interests: [], created_at: new Date() };
    users.push(user);
    res.json({ message: 'User registered', user_id: user.id });
});

// Login
router.post('/login', (req,res)=>{
    const { email, password } = req.body;
    const user = users.find(u=>u.email===email && u.password_hash===password);
    if(!user) return res.status(401).json({error:'Invalid credentials'});
    res.json({ message:'Login successful', user_id: user.id });
});

// Profile
router.get('/me', (req,res)=>{
    const userId = req.query.user_id;
    const user = users.find(u=>u.id==userId);
    if(!user) return res.status(404).json({error:'User not found'});
    res.json(user);
});

module.exports = router;
