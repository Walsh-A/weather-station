import { CurrentWeather, HourlyWeather, WeatherCodes } from './weather';

export class WeatherTools {
  static getWeatherDescription(code: number): string {
    return WeatherCodes[code] ?? 'Unknown Weather';
  }

  static getCurrentPrecipitationProbability(
    hw: HourlyWeather,
    cw: CurrentWeather,
  ): number | undefined {
    // matching current time stamp with hourly percipitation prediction
    const index = hw.time.indexOf(cw.time);

    if (index === -1) {
      return 0;
    }

    return hw.precipitation_probability[index];
  }
}
