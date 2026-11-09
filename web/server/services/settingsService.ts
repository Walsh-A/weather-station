import fs from 'fs/promises';
import path from 'path';

import { Settings } from '../../shared/settings';

const settingsPath = path.resolve('config/settings.json');

export async function getConfiguredZipCode(): Promise<string> {
  const settings = await getSettings();
  const { zipCode } = settings;

  if (!zipCode) {
    throw new Error('no zip code has been configured');
  }
  if (!/^\d{5}$/.test(zipCode)) {
    throw new Error('Configured ZIP code must be 5 digits.');
  }

  return zipCode;
}

export async function getSettings(): Promise<Settings> {
  try {
    const file = await fs.readFile(settingsPath, 'utf-8');

    return JSON.parse(file) as Settings;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      const settings = new Settings();

      await saveSettings(settings);

      return settings;
    }

    console.error('Failed to read settings file:', error);

    return new Settings();
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  try {
    await fs.mkdir(path.dirname(settingsPath), { recursive: true });
    await fs.writeFile(
      settingsPath,
      JSON.stringify(settings, null, 2),
      'utf-8',
    );
  } catch (error) {
    console.error('Failed to save settings file:', error);

    throw error;
  }
}
