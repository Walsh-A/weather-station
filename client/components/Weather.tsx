import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import { CurrentWeather, WeatherResponse } from '../../shared/weather/weather';
import { WeatherTools } from '../../shared/weather/weatherTools';

interface Props {}
interface State {
  weather: WeatherResponse;
}

export default class Weather extends React.Component<Props, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      weather: new WeatherResponse(),
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
    const { weather } = this.state;

    const cw: CurrentWeather = weather?.current;
    // const degreeF = '\u00B0F';
    const degreeC = '\u00B0C';

    return (
      <Stack>
        <Typography>Current Weather</Typography>
        <Divider />
        {this.renderInfoRow(
          'Current Temp:',
          `${cw.temperature_2m}`,
          `${degreeC}`,
        )}
        {this.renderInfoRow(
          'Feels Like:',
          `${cw.apparent_temperature}`,
          `${degreeC}`,
        )}
        {this.renderInfoRow('Humidity:', `${cw.relative_humidity_2m}`, '%')}
        {this.renderInfoRow('Wind Speed:', `${cw.wind_speed_10m}`, 'kph')}
        {this.renderInfoRow('Wind Gusts:', `${cw.wind_gusts_10m}`, 'kph')}
        {this.renderInfoRow(
          'Wind Direction:',
          `${cw.wind_direction_10m}`,
          '\u00B0',
        )}
        {this.renderInfoRow(
          'Weather Code:',
          `${cw.weather_code} - ${WeatherTools.getWeatherDescription(cw.weather_code)}`,
        )}
        {/*  */}
        {this.renderInfoRow('Radin:', `${cw.rain}`, 'mm')}
        {this.renderInfoRow('Showers:', `${cw.showers}`, 'mm')}
        {this.renderInfoRow('Snowfall:', `${cw.snowfall}`, 'cm')}
        {/*  */}
        {this.renderLastUpdated(cw)}
      </Stack>
    );
  }

  private renderInfoRow(label: string, value: string | number, unit?: string) {
    return (
      <Stack direction="row" spacing={1}>
        <Typography>{label}</Typography>
        <Typography>{value}</Typography>
        {unit && <Typography>{unit}</Typography>}
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
