import { WeatherCodes } from './weather';

export class WeatherTools {
  static getWeatherDescription(code: number): string {
    return WeatherCodes[code] ?? 'Unknown Weather';
  }
}
