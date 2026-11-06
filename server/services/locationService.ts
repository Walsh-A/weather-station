export interface LocationResult {
  name: string;
  latitude: number;
  longitude: number;
  state: string;
  zipCode: string;
}

export async function getLocationFromZip(
  zipCode: string,
): Promise<LocationResult> {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');

  url.searchParams.set('name', zipCode);
  url.searchParams.set('count', '1');
  url.searchParams.set('countryCode', 'US');
  url.searchParams.set('language', 'en');
  url.searchParams.set('format', 'json');

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to retreive location');
  }

  const data = await response.json();
  const location = data.results?.[0];

  if (!location) {
    throw new Error('No location found for Zip');
  }

  return {
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    state: location.admin1 ?? '',
    zipCode,
  };
}
