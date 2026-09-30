export async function getCurrentWeather(latitude: number, longitude: number) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');

  url.searchParams.set('latitude', latitude.toString());
  url.searchParams.set('longitude', longitude.toString());
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,rain,showers,snowfall',
  );
  url.searchParams.set('temperature_unit', 'celsius');
  url.searchParams.set('wind_speed_unit', 'kmh');
  url.searchParams.set('precipitation_unit', 'mm');
  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('hourly', 'precipitation_probability');

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to retrieve weather data.');
  }

  return await response.json();
}
