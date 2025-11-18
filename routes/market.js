const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 });

// Crypto
router.get('/crypto', async (req, res) => {
    try {
        if (cache.has('crypto')) return res.json(cache.get('crypto'));
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 50, page: 1, sparkline: false }
        });
        cache.set('crypto', response.data);
        res.json(response.data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Forex
router.get('/forex', async (req, res) => {
    try {
        if (cache.has('forex')) return res.json(cache.get('forex'));
        const response = await axios.get('https://www.freeforexapi.com/api/live?pairs=EURUSD,GBPUSD,USDJPY');
        cache.set('forex', response.data);
        res.json(response.data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Gold
router.get('/gold', async (req, res) => {
    try {
        if (cache.has('gold')) return res.json(cache.get('gold'));
        const response = await axios.get(`https://metals-api.com/api/latest?access_key=${process.env.METALS_KEY}&base=USD&symbols=XAU`);
        cache.set('gold', response.data);
        res.json(response.data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
