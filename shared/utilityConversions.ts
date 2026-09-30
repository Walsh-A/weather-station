export class Conversions {
  static celsiusToFahrenheit(c: number): number | null {
    if (Number.isNaN(c)) return null;

    return Number((c * (9 / 5) + 32).toFixed(2));
  }

  static kilometerPerHourToMilePerHour(kph: number): number | null {
    if (isNaN(kph)) return null;

    return Number((kph * 0.621371).toFixed(2));
  }

  static millimeterToInch(mm: number) {
    if (isNaN(mm)) return null;

    return mm / 25.4;
  }
}
