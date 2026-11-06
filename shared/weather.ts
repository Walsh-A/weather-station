export class WeatherResponse {
  latitude: number = 0;
  longitude: number = 0;
  timezone: string = 'utc';
  current: CurrentWeather = new CurrentWeather();
  hourly: HourlyWeather = new HourlyWeather();
  daily: DailyWeather = new DailyWeather();
}

export class CurrentWeather {
  time: string = '';
  interval: number = 0; // seconds

  temperature_2m: number = 0; // degrees in C
  apparent_temperature: number = 0; // degrees in C
  relative_humidity_2m: number = 0; //%
  dewpoint_2m: number = 0; // degrees in C
  visibility: number = 0; // meters
  pressure_msl: number = 0; // hPa

  weather_code: number = 0;

  wind_speed_10m: number = 0; // kph
  wind_gusts_10m: number = 0; //kph
  wind_direction_10m = 0; // degrees 0-360

  rain: number = 0; // mm
  showers: number = 0; //mm
  snowfall: number = 0; //mm
}
export class HourlyWeather {
  time: string[] = [];
  precipitation_probability: number[] = [];
}

export class DailyWeather {
  time: string[] = [];

  weather_code: number[] = [];

  temperature_2m_max: number[] = [];
  temperature_2m_min: number[] = [];

  precipitation_probability_max: number[] = [];

  sunrise: string[] = [];
  sunset: string[] = [];
}

export const WeatherCodes: Record<number, string> = {
  0: 'Clear Sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing Rime Fog',
  51: 'Light Drizzle',
  53: 'Moderate Drizzle',
  55: 'Dense Drizzle',
  56: 'Light Freezing Drizzle',
  57: 'Dense Freezing Drizzle',
  61: 'Slight Rain',
  63: 'Moderate Rain',
  65: 'Heavy Rain',
  66: 'Light Freezing Rain',
  67: 'Heavy Freezing Rain',
  71: 'Slight Snowfall',
  73: 'Moderate Snowfall',
  75: 'Heavy Snowfall',
  77: 'Snow Grains',
  80: 'Slight Rain Showers',
  81: 'Moderate Rain Showers',
  82: 'Violent Rain Showers',
  85: 'Slight Snow Showers',
  86: 'Heavy Snow Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with Slight Hail',
  99: 'Thunderstorm with Heavy Hail',
};
