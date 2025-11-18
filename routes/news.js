const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req,res)=>{
    try {
        const response = await axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CRYPTOPANIC_KEY}`);
        res.json(response.data.results);
    } catch(err){ res.status(500).json({error: err.message}); }
});

module.exports = router;
