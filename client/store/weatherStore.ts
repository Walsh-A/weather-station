import {
  LocationResponse,
  PrecipitationUnit,
  Settings,
  SpeedUnit,
  TemperatureUnit,
} from '../../shared/settings';
import { WeatherResponse } from '../../shared/weather';
import { BaseStore } from './baseStore';
import { WeeatherEvents } from './Events';

export class WeatherStore extends BaseStore {
  private _location: LocationResponse | null = null;
  private _weather: WeatherResponse = new WeatherResponse();
  private _tempUnit: TemperatureUnit = TemperatureUnit.F;
  private _speedUnit: SpeedUnit = SpeedUnit.MPH;
  private _precipitationUnit: PrecipitationUnit = PrecipitationUnit.in;
  private _zipCode: string | null = null;

  private _settingsOpen: boolean = false;

  async loadData() {
    const promises = [
      () => this.loadSettings(),
      () => this.loadLocation(),
      () => this.loadWeather(),
    ];

    for (const promise of promises) {
      await promise();
    }
  }

  async loadWeather() {
    try {
      const response = await fetch('/api/weather');

      if (!response.ok) {
        throw new Error('Failed to retrieve weather data.');
      }

      const data: WeatherResponse = await response.json();

      this.weather = data;
    } catch (err) {
      console.log(
        'ERROR',
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    }
  }

  async loadSettings() {
    try {
      const response = await fetch('/api/settings');

      if (!response.ok) {
        throw new Error('Failed to retrieve settings.');
      }

      const settings: Settings = await response.json();

      this.tempUnit = settings.tempUnit;
      this.speedUnit = settings.speedUnit;
      this.precipitationUnit = settings.precipitationUnit;
      this.zipCode = settings.zipCode;

      this.callEmit(WeeatherEvents.WeatherSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  async loadLocation() {
    try {
      const response = await fetch('/api/location');

      if (!response.ok) {
        throw new Error('Failed to retrieve location.');
      }

      const location: LocationResponse = await response.json();

      this.location = location;
    } catch (error) {
      console.error('Failed to load location:', error);
    }
  }

  // #region Getters and Setters
  get location(): LocationResponse | null {
    return this._location;
  }
  set location(value: LocationResponse | null) {
    this._location = value;
    this.callEmit(WeeatherEvents.WeatherLocation);
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
  }

  get speedUnit(): SpeedUnit {
    return this._speedUnit;
  }
  set speedUnit(value: SpeedUnit) {
    this._speedUnit = value;
  }

  get precipitationUnit(): PrecipitationUnit {
    return this._precipitationUnit;
  }
  set precipitationUnit(value: PrecipitationUnit) {
    this._precipitationUnit = value;
  }

  get zipCode(): string | null {
    return this._zipCode;
  }
  set zipCode(value: string | null) {
    this._zipCode = value;
  }

  get settingsOpen(): boolean {
    return this._settingsOpen;
  }
  set settingsOpen(value: boolean) {
    this._settingsOpen = value;
    this.callEmit(WeeatherEvents.WeatherSettingsOpen);
  }

  get degreeSymbol(): string {
    return '\u00B0';
  }

  //#region Functions
  async saveSettings(
    tempUnit: TemperatureUnit,
    speedUnit: SpeedUnit,
    precipitationUnit: PrecipitationUnit,
    zipCode: string | null,
  ) {
    const settings = new Settings();

    settings.tempUnit = tempUnit;
    settings.speedUnit = speedUnit;
    settings.precipitationUnit = precipitationUnit;
    settings.zipCode = zipCode;

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings.');
      }

      this.tempUnit = settings.tempUnit;
      this.speedUnit = settings.speedUnit;
      this.precipitationUnit = settings.precipitationUnit;
      this.zipCode = settings.zipCode;

      this.settingsOpen = false;

      this.callEmit(WeeatherEvents.WeatherSettings);
      void this.loadLocation();
      void this.loadWeather();
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }
}

export const weatherStore = new WeatherStore();
