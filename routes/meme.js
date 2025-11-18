const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 });

router.get('/', async (req, res) => {
    try {
        if (cache.has('meme')) return res.json(cache.get('meme'));
        const response = await axios.get('https://api.dexscreener.com/latest/dex/tokens');
        cache.set('meme', response.data);
        res.json(response.data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
