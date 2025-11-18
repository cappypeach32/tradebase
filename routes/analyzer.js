const express = require('express');
const router = express.Router();
const axios = require('axios');
const openai = require('../services/openai');

router.get('/coin/:id', async (req,res)=>{
    try{
        const coinId = req.params.id;

        // CoinGecko data
        const coinData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        const price = coinData.data.market_data.current_price.usd;
        const trend = price > coinData.data.market_data.high_24h.usd*0.95 ? 'uptrend':'downtrend';
        const support = coinData.data.market_data.low_24h.usd;
        const resistance = coinData.data.market_data.high_24h.usd;

        // CryptoPanic news
        const newsResp = await axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CRYPTOPANIC_KEY}&currencies=${coinId}`);
        const news = newsResp.data.results.slice(0,5);

        // OpenAI GPT scenario
        const prompt = `Analyze ${coinData.data.name} (${coinData.data.symbol}) current price: $${price}, trend: ${trend}, support: ${support}, resistance: ${resistance}. Provide short bullish, bearish, and neutral scenarios.`;
        const ai_scenario = await openai.generateScenario(prompt);

        res.json({
            coin_id: coinId,
            name: coinData.data.name,
            symbol: coinData.data.symbol,
            current_price: price,
            trend,
            key_levels: {support,resistance},
            news,
            ai_scenario
        });
    }catch(err){ res.status(500).json({error:err.message}); }
});

module.exports = router;
