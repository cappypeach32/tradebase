const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/events', async (req,res)=>{
    try {
        const coinMarketCal = await axios.get(`https://coinmarketcal.com/api/v1/events?access_token=${process.env.COINMARKETCAL_KEY}`);
        const tradingEcon = await axios.get(`https://api.tradingeconomics.com/calendar?c=${process.env.TRADINGECONOMICS_KEY}`);
        const events = [...coinMarketCal.data.events, ...tradingEcon.data];
        res.json(events);
    } catch(err){ res.status(500).json({error: err.message}); }
});

module.exports = router;
