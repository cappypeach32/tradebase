const express = require('express');
const router = express.Router();

let posts = [];

// Create post
router.post('/post', (req,res)=>{
    const post = { id: posts.length+1, ...req.body, created_at: new Date() };
    posts.push(post);
    res.json(post);
});

// Get all posts
router.get('/posts',(req,res)=>res.json(posts));

module.exports = router;
