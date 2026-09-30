export class Conversions {
  static celsiusToFahrenheit(c: number): number | null {
    if (Number.isNaN(c)) return null;

    return Number((c * (9 / 5) + 32).toFixed(2));
  }

  static kilometerPerHourToMilePerHour(kph: number) {
    if (isNaN(kph)) return null;

    return kph * 0.621371;
  }

  static millimeterToInch(mm: number) {
    if (isNaN(mm)) return null;

    return mm / 25.4;
  }
}
