# Weather Station

**Your weather, at a glance.**

Weather Station is a dedicated, always-on weather display project designed around a 7.5-inch, 800 × 480 black-and-white e-ink screen. It presents useful local weather information in a clean, passive format that can sit on a counter or hang on a wall without requiring regular interaction.

The repository now contains two related implementations:

```text
weather-station/
├── web/    # Current React/TypeScript implementation
└── eink/   # Native Raspberry Pi/e-ink implementation
```

The `web` version is the current working implementation and serves as both a functional weather dashboard and a visual reference for the future native e-ink version.

The `eink` version will be built specifically for Raspberry Pi hardware using Python, Pillow, and the e-ink display driver, without requiring React or a web browser.

## Web Version

The current application lives under:

```text
web/
```

It is built with React, TypeScript, Rspack, Bun, Express, and MUI.

### Run Locally

From the repository root:

```bash
cd web
bun install
bun run dev
```

Then open:

```text
http://localhost:8080
```

The frontend and backend can also be run separately with:

```bash
bun run dev:client
bun run dev:server
```

Other useful commands:

```bash
bun run build         # Create a production bundle
bun run typecheck     # Check TypeScript
bun run format:check  # Verify formatting
```

### Current Web Features

- **Current Conditions** — Temperature, feels-like temperature, humidity, precipitation, wind, visibility, pressure, dew point, and other current weather information.
- **Seven-Day Forecast** — Daily conditions, high and low temperatures, precipitation chance, sunrise, and sunset times.
- **Severe Weather Alerts** — Active watches, warnings, and advisories from the National Weather Service.
- **Live Date and Time** — The display clock updates as needed while the app is running.
- **Automatic Weather Refresh** — Weather data is refreshed one minute after each quarter hour, at `:01`, `:16`, `:31`, and `:46`.
- **Automatic Alert Refresh** — Severe weather alerts are checked every five minutes.
- **Configurable Location** — Weather data is selected by ZIP code.
- **Unit Preferences** — Configurable temperature, wind speed, and precipitation units.
- **Persistent Settings** — User preferences are stored locally and restored when the application starts.

Press `S` from the weather display to open settings. Press `Escape` to close settings without making changes.

## E-Ink Version

The native e-ink implementation will live under:

```text
eink/
```

This version is intended to run directly on a Raspberry Pi connected to the physical e-ink display.

Instead of using React and a browser, the e-ink version will use a lightweight native rendering approach:

```text
Open-Meteo / NWS
        ↓
Python application
        ↓
Pillow renders an 800 × 480 image
        ↓
E-ink display driver
        ↓
7.5-inch e-ink screen
```

The goal is to reuse the same weather logic and overall display design while removing the browser/runtime overhead that is unnecessary for a dedicated e-ink appliance.

Planned Python modules will likely cover:

```text
eink/
├── main.py
├── weather_service.py
├── alert_service.py
├── location_service.py
├── settings_service.py
├── renderer.py
└── settings.json
```

The exact structure may change as the native implementation develops.

## Display Target

Both implementations are designed around the same fixed display target:

```text
800 × 480 pixels
7.5-inch black-and-white e-ink display
```

The interface is designed to:

- Fit entirely within the 800 × 480 display without scrolling.
- Use high-contrast graphics suitable for black-and-white e-ink.
- Remain readable from a distance.
- Avoid unnecessary animation and interaction.
- Refresh weather information on a predictable schedule.
- Minimize unnecessary physical e-ink redraws.

## Weather Data and Refreshing

Weather forecasts and current conditions are provided by Open-Meteo.

Severe weather alerts are provided by the National Weather Service.

Weather data is loaded when the application starts and then refreshed at:

```text
:01
:16
:31
:46
```

This one-minute delay gives the upstream quarter-hour weather update time a chance to become available before the next request.

Severe weather alerts are checked every five minutes.

When multiple alerts are active, the current web implementation cycles through them every 30 seconds.

The native e-ink version may handle multiple alerts differently to avoid unnecessary display refreshes.

## Settings

Current settings include:

- ZIP code
- Temperature unit
- Wind speed unit
- Precipitation unit

The web implementation stores these settings locally in a JSON settings file.

The native e-ink version is expected to use the same general JSON-based settings approach.

## Hardware

The current hardware target is:

- **7.5-inch 800 × 480 black-and-white e-ink display**
- **Raspberry Pi Zero 2 W or similar Raspberry Pi**
- Wi-Fi connection for weather and alert data
- MicroSD card for the operating system and application
- Wall-mounted or countertop enclosure

The final display driver/HAT and enclosure are still being evaluated.

## Planned Features

- **Native E-Ink Renderer** — Rebuild the current display using Python and Pillow.
- **Raspberry Pi Integration** — Run the application directly on dedicated Pi hardware.
- **Physical Display Driver Support** — Send the rendered 800 × 480 image directly to the e-ink panel.
- **Display Refresh Optimization** — Redraw the physical display only when useful information changes.
- **Air Quality** — Optional local AQI information.
- **Additional Settings** — Additional display and time-format preferences as the project evolves.

## Project Goals

Weather Station should be:

- Simple and easy to read at a glance.
- Designed specifically for e-ink.
- Capable of running continuously on dedicated hardware.
- Focused exclusively on useful local weather information.
- Low maintenance once configured.
- Lightweight and reliable on Raspberry Pi hardware.
- Modular enough to support additional weather data later.

## Project Status

🚧 **Active Development**

The `web` implementation is functional and currently includes current conditions, a seven-day forecast, severe weather alerts, date/time information, automatic data refreshing, ZIP-code-based location selection, unit preferences, and persistent settings.

The repository has now been split into `web` and `eink` subprojects.

The next major phase is building the native `eink` implementation using Python and Pillow, then connecting it to Raspberry Pi and physical e-ink hardware.

---

_Your weather, at a glance._
