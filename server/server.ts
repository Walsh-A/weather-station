import express from 'express';

import { getActiveNwsAlerts } from './services/nwsAlertService';
import { getCurrentWeather } from './services/weatherService';
import { getSettings, saveSettings } from './services/settingsService';

const app = express();
const PORT = 3001;
app.use(express.json());

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

// Weather Alerts
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

// Settings
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await getSettings();

    res.json(settings);
  } catch (error) {
    console.error('Get Settings API error:', error);
    res.status(500).json({
      error: 'Failed to retrieve settings.',
    });
  }
});
app.post('/api/settings', async (req, res) => {
  try {
    await saveSettings(req.body);

    res.json({ success: true });
  } catch (error) {
    console.error('Save Settings API error:', error);
    res.status(500).json({
      error: 'Failed to save settings.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Home Station server running on port ${PORT}`);
});
