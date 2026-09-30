export class Conversions {
  static celsiusToFahrenheit(c: number) {
    if (!c || isNaN(c)) return null;

    return c * (9 / 5) + 32;
  }

  static kilometerPerHourToMilePerHour(kph: number) {
    if (!kph || isNaN(kph)) return null;

    return kph * 0.621371;
  }

  static millimeterToInch(mm: number) {
    if (!mm || isNaN(mm)) return null;

    return mm / 25.4;
  }
}
