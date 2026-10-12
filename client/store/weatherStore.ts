import {
  PrecipitationUnit,
  SpeedUnit,
  TemperatureUnit,
  WeatherResponse,
} from '../../shared/weather/weather';
import { BaseStore } from './baseStore';
import { WeeatherEvents } from './Events';

export class WeatherStore extends BaseStore {
  private _weather: WeatherResponse = new WeatherResponse();
  private _tempUnit: TemperatureUnit = TemperatureUnit.F;
  private _speedUnit: SpeedUnit = SpeedUnit.MPH;
  private _precipitationUnit: PrecipitationUnit = PrecipitationUnit.in;

  async loadWeather() {
    try {
      const response = await fetch('/api/weather');

      if (!response.ok) {
        throw new Error('Failed to retrieve weather data.');
      }

      const data: WeatherResponse = await response.json();

      //   this.setState({ weather: data });
      //   return data;
      this.weather = data;
    } catch (err) {
      console.log(
        'ERROR',
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    }
  }

  get weather(): WeatherResponse {
    return this._weather;
  }
  set weather(value: WeatherResponse) {
    this._weather = value;
    this.callEmit(WeeatherEvents.WeatherUpdate);
  }

  get tempUnit(): TemperatureUnit {
    return this._tempUnit;
  }
  set tempUnit(value: TemperatureUnit) {
    this._tempUnit = value;
    this.callEmit(WeeatherEvents.WeatherSettings);
  }

  get speedUnit(): SpeedUnit {
    return this._speedUnit;
  }
  set speedUnit(value: SpeedUnit) {
    this._speedUnit = value;
    this.callEmit(WeeatherEvents.WeatherSettings);
  }

  get precipitationUnit(): PrecipitationUnit {
    return this._precipitationUnit;
  }
  set precipitationUnit(value: PrecipitationUnit) {
    this._precipitationUnit = value;
    this.callEmit(WeeatherEvents.WeatherSettings);
  }
}

export const weatherStore = new WeatherStore();
