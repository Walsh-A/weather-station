import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import {
  CurrentWeather,
  HourlyWeather,
  TemperatureUnit,
  WeatherResponse,
} from '../../shared/weather/weather';
import { WeatherTools } from '../../shared/weather/weatherTools';
import WeatherTemperatures from '../components/weather/WeatherTemperatures';
import WeatherUserControls from '../components/weather/WeatherUserControls';
import WeatherItemRow from '../components/weather/WeatherItemRow';

interface Props {}
interface State {
  weather: WeatherResponse;
  tempUnit: TemperatureUnit;
}

export default class Weather extends React.Component<Props, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      weather: new WeatherResponse(),
      tempUnit: TemperatureUnit.F,
    };
  }

  override componentDidMount() {
    this.loadWeather();
  }

  async loadWeather() {
    try {
      const response = await fetch('/api/weather');

      if (!response.ok) {
        throw new Error('Failed to retrieve weather data.');
      }

      const data: WeatherResponse = await response.json();

      this.setState({ weather: data });
    } catch (err) {
      console.log(
        'ERROR',
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    }
  }

  override render() {
    const { weather, tempUnit } = this.state;

    const cw: CurrentWeather = weather?.current;
    const hw: HourlyWeather = weather?.hourly;

    const precipitationProp = WeatherTools.getCurrentPrecipitationProbability(
      hw,
      cw,
    );

    return (
      <Stack>
        <Stack direction="row">
          <Typography>Current Weather</Typography>
          <Divider orientation="vertical" style={{ width: 4 }} />
          <WeatherUserControls
            tempUnit={tempUnit}
            handleTempUnitChange={(value: TemperatureUnit) =>
              this.setState({ tempUnit: value })
            }
          />
        </Stack>
        <Divider />
        <WeatherTemperatures
          currentWeather={cw}
          temperatureUnit={this.state.tempUnit}
        />
        <WeatherItemRow
          label="Wind Speed:"
          value={cw.wind_speed_10m}
          unit="kph"
        />
        <WeatherItemRow
          label="Wind Gusts:"
          value={cw.wind_gusts_10m}
          unit="kph"
        />
        <WeatherItemRow
          label="Wind Direction:"
          value={cw.wind_direction_10m}
          unit={`\u00B0`}
        />
        <WeatherItemRow
          label="Weather Code:"
          value={`${cw.weather_code} - ${WeatherTools.getWeatherDescription(cw.weather_code)}`}
        />
        <WeatherItemRow
          label="Chance of Precipitation:"
          value={precipitationProp}
          unit="%"
        />
        <WeatherItemRow label="Rain:" value={cw.rain} unit="mm" />
        <WeatherItemRow label="Showers:" value={cw.showers} unit="mm" />
        <WeatherItemRow label="Snowfall:" value={cw.snowfall} unit="cm" />
        {this.renderLastUpdated(cw)}
      </Stack>
    );
  }

  private renderLastUpdated(cw: CurrentWeather) {
    if (!cw?.time) return null;

    const updatedDate = new Date(cw.time);

    return (
      <Stack direction="row" spacing={1}>
        <Typography>updated</Typography>
        <Stack direction="row" spacing={1}>
          <Typography>{updatedDate.toLocaleDateString()}</Typography>
          <Typography>{updatedDate.toLocaleTimeString()}</Typography>
        </Stack>
      </Stack>
    );
  }
}
