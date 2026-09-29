import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import { CurrentWeather, WeatherResponse } from '../../shared/types/weather';
import { WeatherTools } from '../../shared/types/weatherTools';

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
    const degreeF = '\u00B0F';

    return (
      <Stack>
        <Typography>Current Weather</Typography>
        <Divider />
        {this.renderInfoRow(
          'Current Temp:',
          `${cw.temperature_2m}`,
          `${degreeF}`,
        )}
        {this.renderInfoRow(
          'Feels Like:',
          `${cw.apparent_temperature}`,
          `${degreeF}`,
        )}
        {this.renderInfoRow('Humidity:', `${cw.relative_humidity_2m}`, '%')}
        {this.renderInfoRow('Wind Speed:', `${cw.wind_speed_10m}`, 'mph')}
        {this.renderInfoRow(
          'Weather Code:',
          `${cw.weather_code} - ${WeatherTools.getWeatherDescription(cw.weather_code)}`,
        )}
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
}
