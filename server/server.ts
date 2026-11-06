import express from 'express';

import { getActiveNwsAlerts } from './services/nwsAlertService';
import { getCurrentWeather } from './services/weatherService';
import {
  getConfiguredZipCode,
  getSettings,
  saveSettings,
} from './services/settingsService';
import { getLocationFromZip } from './services/locationService';

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
  try {
    const zipCode = await getConfiguredZipCode();
    const location = await getLocationFromZip(zipCode);

    const weather = await getCurrentWeather(
      location.latitude,
      location.longitude,
    );

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
    const zipCode = await getConfiguredZipCode();
    const location = await getLocationFromZip(zipCode);

    const alerts = await getActiveNwsAlerts(
      location.latitude,
      location.longitude,
    );

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
    const { zipCode } = req.body;

    if (
      zipCode !== null &&
      (typeof zipCode !== 'string' || !/^\d{5}$/.test(zipCode))
    ) {
      res.status(400).json({
        error: 'ZIP code must be 5 digits.',
      });

      return;
    }

    await saveSettings(req.body);

    res.json({ success: true });
  } catch (error) {
    console.error('Save Settings API error:', error);
    res.status(500).json({
      error: 'Failed to save settings.',
    });
  }
});

// Location
app.get('/api/location', async (req, res) => {
  try {
    const zipCode = await getConfiguredZipCode();
    const location = await getLocationFromZip(zipCode);

    res.json(location);
  } catch (error) {
    console.error('Location API error:', error);

    res.status(500).json({
      error: 'Failed to retrieve location.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Home Station server running on port ${PORT}`);
});
