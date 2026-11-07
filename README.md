# Weather Station

**Your weather, at a glance.**

Weather Station is a dedicated, always-on weather dashboard designed for a
7.5-inch, 800 × 480 black-and-white e-ink display. It presents useful local
weather information in a clean, passive format that can sit on a counter or
hang on a wall without requiring regular interaction.

## Run Locally

Install dependencies and start both the frontend and backend development
servers:

```bash
bun install
bun run dev
```

Then open:

```text
http://localhost:8080
```

The frontend and backend can also be run separately with `bun run dev:client`
and `bun run dev:server`.

Other useful commands:

```bash
bun run build         # Create a production bundle
bun run typecheck     # Check TypeScript
bun run format:check  # Verify formatting
```

## Features

- **Current Conditions** — Temperature, feels-like temperature, humidity,
  precipitation, wind, visibility, pressure, dew point, and other current
  weather information.
- **Seven-Day Forecast** — Daily conditions, high and low temperatures,
  precipitation chance, sunrise, and sunset times.
- **Severe Weather Alerts** — Active watches, warnings, and advisories from the
  National Weather Service.
- **Live Date and Time** — The display clock checks once per second and updates
  when the displayed minute or date changes.
- **Automatic Weather Refresh** — Weather data is refreshed one minute after
  each quarter hour, at `:01`, `:16`, `:31`, and `:46`.
- **Configurable Location** — Weather data can be selected by ZIP code.
- **Unit Preferences** — Configurable temperature, wind speed, and
  precipitation units.
- **Persistent Settings** — User preferences are stored locally and restored
  when the application starts.

Press `S` from the weather display to open settings. Press `Escape` to close
settings without making changes.

## Display

The interface targets a fixed display:

```text
800 × 480 pixels
7.5-inch e-ink display
```

The browser currently serves as the development and layout environment. The
final application is intended to run as a dedicated weather display rather
than a traditional interactive website.

The interface is designed to:

- Fit entirely within the 800 × 480 display without scrolling.
- Use high-contrast graphics suitable for black-and-white e-ink.
- Remain readable from a distance.
- Avoid unnecessary animation and interaction.
- Refresh weather information on a predictable schedule.

## Weather Data and Refreshing

Weather forecasts and current conditions are provided by Open-Meteo. Severe
weather alerts are provided by the National Weather Service.

The backend retrieves data from these external services and exposes it to the
frontend through local API endpoints. Weather data is loaded when the
application starts and then refreshed at `:01`, `:16`, `:31`, and `:46` each
hour. This one-minute delay gives the upstream quarter-hour update time to
become available before it is requested.

Severe weather alerts are checked every five minutes. When multiple alerts are
active, the display cycles through them every 30 seconds.

## Planned Features

- **Air Quality** — Optional local AQI information.
- **E-Ink Hardware Support** — Output the dashboard to a physical e-ink display
  connected to a Raspberry Pi or similar device.
- **Display Refresh Optimization** — Coordinate browser updates with physical
  e-ink refreshes to reduce unnecessary redraws and ghosting.

## Hardware

The current hardware concept is:

- 7.5-inch 800 × 480 e-ink display
- Raspberry Pi Zero 2 W or similar device
- Wi-Fi connection for retrieving weather updates
- Wall-mounted or countertop enclosure

The exact hardware configuration is still being evaluated.

## Project Goals

Weather Station should be:

- Simple and easy to read at a glance.
- Designed specifically for e-ink.
- Capable of running continuously on dedicated hardware.
- Focused exclusively on useful local weather information.
- Low maintenance once configured.
- Modular enough to support additional weather data later.

## Project Status

🚧 **Active Development**

The browser-based weather dashboard is functional, including current
conditions, a seven-day forecast, severe weather alerts, a live clock,
automatic data refreshing, location selection, unit preferences, and
persistent settings.

The next major goal is preparing the application for dedicated e-ink hardware
and optimizing physical display refreshes.

---

_Your weather, at a glance._
