export class Settings {
  tempUnit: TemperatureUnit = TemperatureUnit.F;
  speedUnit: SpeedUnit = SpeedUnit.MPH;
  precipitationUnit: PrecipitationUnit = PrecipitationUnit.in;
  zipCode: string | null = null;
}

export enum TemperatureUnit {
  F = 'F',
  C = 'C',
}

export enum SpeedUnit {
  MPH = 'MPH',
  KPH = 'KPH',
}

export enum PrecipitationUnit {
  mm = 'mm',
  in = 'in',
}

export interface LocationResponse {
  name: string;
  latitude: number;
  longitude: number;
  state: string;
  zipCode: string;
}
