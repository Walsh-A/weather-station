export class Conversions {
  static celsiusToFahrenheit(c: number) {
    if (isNaN(c)) return null;

    return c * (9 / 5) + 32;
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
