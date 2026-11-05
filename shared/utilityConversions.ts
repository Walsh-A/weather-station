import { PrecipitationUnit, SpeedUnit, TemperatureUnit } from './weather';

export class Conversions {
  // #region Temperature
  static celsiusToFahrenheit(c: number, round: number = 2): number | null {
    if (Number.isNaN(c)) return null;

    return Number((c * (9 / 5) + 32).toFixed(round));
  }

  static convertTempUnit(
    temp_c: number,
    unit: TemperatureUnit,
    round?: number,
  ) {
    if (unit === TemperatureUnit.C) return temp_c;

    return (
      Conversions.celsiusToFahrenheit(temp_c, round) ?? temp_c.toFixed(round)
    );
  }

  // #region Speed
  static kilometerPerHourToMilePerHour(
    kph: number,
    round: number = 2,
  ): number | null {
    if (isNaN(kph)) return null;

    return Number((kph * 0.621371).toFixed(round));
  }

  static convertSpeedUnits(speed_kph: number, unit: SpeedUnit, round?: number) {
    if (unit === SpeedUnit.KPH) return speed_kph;

    return (
      Conversions.kilometerPerHourToMilePerHour(speed_kph, round) ??
      speed_kph.toFixed(round)
    );
  }

  // #region Distance
  static millimeterToInch(mm: number) {
    if (isNaN(mm)) return null;

    return mm / 25.4;
  }

  static meterToMile(meters: number, round: number = 2) {
    if (isNaN(meters)) return null;

    return Number((meters / 1609.344).toFixed(round));
  }

  static convertPrecipitationUnits(
    value_mm: number,
    precipUnit: PrecipitationUnit,
  ): number {
    if (precipUnit === PrecipitationUnit.mm) return value_mm;

    return Conversions.millimeterToInch(value_mm) ?? value_mm;
  }

  // #region Pressure
  static convertPascalToInHg(pressure_hPa: number, round: number = 2) {
    if (isNaN(pressure_hPa)) return null;

    return Number(pressure_hPa * 0.0295299830714).toFixed(round);
  }
}
