import { NwsAlertCollection } from '../../shared/weather/weatherAlert';

export async function getActiveNwsAlerts(
  latitude: number,
  longitude: number,
): Promise<NwsAlertCollection> {
  const url = new URL('https://api.weather.gov/alerts/active');

  url.searchParams.set('point', `${latitude},${longitude}`);

  const response = await fetch(url, {
    headers: {
      Accept: 'application/geo+json',
      'User-Agent': 'HomeStation',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error('NWS alert API error:', errorText);

    throw new Error('Failed to retrieve NWS alerts.');
  }

  const data: NwsAlertCollection = await response.json();

  return data;
}
