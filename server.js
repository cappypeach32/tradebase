require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const marketRoutes = require('./routes/market');
const memeRoutes = require('./routes/meme');
const analyzerRoutes = require('./routes/analyzer');
const newsRoutes = require('./routes/news');
const calendarRoutes = require('./routes/calendar');
const alertsRoutes = require('./routes/alerts');
const communityRoutes = require('./routes/community');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/market', marketRoutes);
app.use('/market/meme-coins', memeRoutes);
app.use('/analysis', analyzerRoutes);
app.use('/news', newsRoutes);
app.use('/calendar', calendarRoutes);
app.use('/alerts', alertsRoutes);
app.use('/community', communityRoutes);
app.use('/auth', authRoutes);

// Health check
app.get('/', (req, res) => res.send('TradeBase backend running'));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

// Global error handler
app.use((err, req, res, next) => {
    console.error("🔥 SERVER ERROR:", err);  // това ще се вижда в Render Logs
    res.status(500).json({ error: err.message || "Server error" });
  });
  
