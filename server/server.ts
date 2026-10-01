import express from 'express';

import { getCurrentWeather } from './services/weather/weatherService';
import { getActiveNwsAlerts } from './services/weather/nwsAlertService';
import { getLocalNews } from './services/news/newsService';

const app = express();
const PORT = 3001;

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Home Station server is running',
  });
});

// Weather
app.get('/api/weather', async (req, res) => {
  // hardcoded coordinates for Columbus, OH (39.9612° N, 82.9988° W)
  try {
    const latitude = 39.9612;
    const longitude = -82.9988;

    const weather = await getCurrentWeather(latitude, longitude);

    res.json(weather);
  } catch (error) {
    console.error('Weather API error:', error);

    res.status(500).json({
      error: 'Failed to retrieve weather data.',
    });
  }
});

app.get('/api/alerts', async (req, res) => {
  try {
    const latitude = 39.9612;
    const longitude = -82.9988;

    const alerts = await getActiveNwsAlerts(latitude, longitude);

    res.json(alerts);
  } catch (error) {
    console.error('NWS alert error:', error);

    res.status(500).json({
      error: 'Failed to retrieve NWS alerts.',
    });
  }
});

// News
app.get('/api/news', async (req, res) => {
  try {
    const news = await getLocalNews();

    res.json(news);
  } catch (error) {
    console.error('News feed error:', error);

    res.status(500).json({
      error: 'Failed to retrieve local news.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Home Station server running on port ${PORT}`);
});
