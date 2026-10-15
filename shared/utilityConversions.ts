import { PrecipitationUnit, TemperatureUnit } from './weather/weather';

export class Conversions {
  // #region Temperature
  static celsiusToFahrenheit(c: number): number | null {
    if (Number.isNaN(c)) return null;

    return Number((c * (9 / 5) + 32).toFixed(2));
  }

  static convertTempUnit(temp_c: number, unit: TemperatureUnit) {
    if (unit === TemperatureUnit.C) return temp_c;

    return Conversions.celsiusToFahrenheit(temp_c) ?? temp_c;
  }

  // #region Speed
  static kilometerPerHourToMilePerHour(kph: number): number | null {
    if (isNaN(kph)) return null;

    return Number((kph * 0.621371).toFixed(2));
  }

  // #region Distance
  static millimeterToInch(mm: number) {
    if (isNaN(mm)) return null;

    return mm / 25.4;
  }

  static convertPrecipitationUnits(
    value_mm: number,
    precipUnit: PrecipitationUnit,
  ): number {
    if (precipUnit === PrecipitationUnit.mm) return value_mm;

    return Conversions.millimeterToInch(value_mm) ?? value_mm;
  }
}
