const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 }); // cache for 60 seconds

// --- Helper: Retry logic ---
async function fetchWithRetry(url, params = {}, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.get(url, { params });
            return response.data;
        } catch (err) {
            console.warn(`Retry ${i + 1} for ${url}...`);
            if (i === retries - 1) throw err;
            await new Promise(r => setTimeout(r, delay));
        }
    }
}

// --- Crypto ---
router.get('/crypto', async (req, res) => {
    try {
        if (cache.has('crypto')) return res.json(cache.get('crypto'));

        const data = await fetchWithRetry('https://api.coingecko.com/api/v3/coins/markets', {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
            sparkline: false
        });

        cache.set('crypto', data);
        res.json(data);
    } catch (err) {
        console.error("🔥 Crypto API ERROR:", err.response?.data || err.message);
        res.status(500).json({ error: err.message });
    }
});

// --- Forex ---
router.get('/forex', async (req, res) => {
    try {
        if (cache.has('forex')) return res.json(cache.get('forex'));

        const data = await fetchWithRetry('https://www.freeforexapi.com/api/live', { pairs: 'EURUSD,GBPUSD,USDJPY' });

        cache.set('forex', data);
        res.json(data);
    } catch (err) {
        console.error("🔥 Forex API ERROR:", err.response?.data || err.message);
        res.status(500).json({ error: err.message });
    }
});

// --- Gold ---
router.get('/gold', async (req, res) => {
    try {
        if (cache.has('gold')) return res.json(cache.get('gold'));

        if (!process.env.METALS_KEY) throw new Error("METALS_KEY is missing in environment variables");

        const data = await fetchWithRetry('https://metals-api.com/api/latest', {
            access_key: process.env.METALS_KEY,
            base: 'USD',
            symbols: 'XAU'
        });

        cache.set('gold', data);
        res.json(data);
    } catch (err) {
        console.error("🔥 Gold API ERROR:", err.response?.data || err.message);
        res.status(500).json({ error: err.message });
    }
});

// --- Meme Coins ---
router.get('/meme-coins', async (req, res) => {
    try {
        if (cache.has('meme-coins')) return res.json(cache.get('meme-coins'));

        const data = await fetchWithRetry('https://api.coingecko.com/api/v3/coins/markets', {
            vs_currency: 'usd',
            category: 'meme',
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
            sparkline: false
        });

        cache.set('meme-coins', data);
        res.json(data);
    } catch (err) {
        console.error("🔥 Meme Coins API ERROR:", err.response?.data || err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
