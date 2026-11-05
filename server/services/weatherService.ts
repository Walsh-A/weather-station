export async function getCurrentWeather(latitude: number, longitude: number) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');

  url.searchParams.set('latitude', latitude.toString());
  url.searchParams.set('longitude', longitude.toString());
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,dewpoint_2m,apparent_temperature,weather_code,visibility,pressure_msl,wind_speed_10m,wind_gusts_10m,wind_direction_10m,rain,showers,snowfall',
  );

  url.searchParams.set('hourly', 'precipitation_probability');
  url.searchParams.set(
    'daily',
    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
  );

  url.searchParams.set('temperature_unit', 'celsius');
  url.searchParams.set('wind_speed_unit', 'kmh');
  url.searchParams.set('precipitation_unit', 'mm');
  url.searchParams.set('timezone', 'UTC');

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to retrieve weather data.');
  }

  const weather = await response.json();

  // Open-Meteo returns snowfall depth in cm.
  // Convert it to mm of precipitation water equivalent.
  weather.current.snowfall = weather.current.snowfall * (10 / 7);

  return weather;
}
