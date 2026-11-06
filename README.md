# Weather Station

## Run Locally

Install dependencies with `bun install`, then start the frontend with:

```bash
bun run dev
```

Start the backend server separately with:

```bash
bun run server
```

Open:

```text
http://localhost:8080
```

Run `bun run build` to create a production bundle, `bun run typecheck` to check TypeScript, and `bun run format:check` to verify formatting.

---

**Your weather, at a glance.**

Weather Station is a dedicated, always-on weather display designed for a small e-ink screen.

The goal is to provide useful local weather information in a clean, passive format that can sit on a counter or hang on a wall without requiring interaction.

The application is currently being designed around a **7.5-inch 800 × 480 e-ink display**.

## Features

- **Current Conditions** — Temperature, feels-like temperature, humidity, precipitation, wind, visibility, and other current weather information.

- **Seven-Day Forecast** — Daily weather conditions, high and low temperatures, and precipitation chance.

- **Severe Weather Alerts** — Active watches, warnings, and advisories from the National Weather Service.

- **Sunrise and Sunset** — Daily sunrise and sunset times.

- **Unit Preferences** — Configurable temperature, wind speed, and precipitation units.

- **Persistent Settings** — User preferences are stored locally and restored when the application starts.

## Planned Features

- **Configurable Location** — Select the location used for weather data.

- **Additional Weather Data** — Pressure, dew point, visibility, and other useful measurements.

- **Air Quality** — Optional local AQI information.

- **E-Ink Hardware Support** — Output the dashboard to a physical e-ink display connected to a Raspberry Pi or similar device.

- **Automatic Refreshing** — Periodically retrieve updated weather information and refresh the display.

## Display

The interface is being designed specifically for a fixed:

```text
800 × 480 pixel
7.5-inch e-ink display
```

The browser is currently used as a development and layout environment.

The final application is intended to run as a dedicated weather display rather than a traditional interactive website.

The interface should:

- Fit entirely within the 800 × 480 display.
- Require no scrolling.
- Use high-contrast graphics suitable for black-and-white e-ink.
- Avoid unnecessary animation and interaction.
- Be readable from a distance.
- Refresh only when weather information needs to be updated.

## Weather Data

Weather data is provided by Open-Meteo.

Severe weather alerts are provided by the National Weather Service.

The backend retrieves external weather data and exposes it to the frontend through local API endpoints.

## Hardware

The current hardware concept is:

- **7.5-inch 800 × 480 e-ink display**
- **Raspberry Pi Zero 2 W or similar device**
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

The weather API, current conditions, seven-day forecast, severe weather alerts, sunrise and sunset information, unit preferences, and persistent settings are currently being developed.

The next major goal is completing the 800 × 480 e-ink display layout and preparing the application for dedicated hardware.

---

_Your weather, at a glance._
