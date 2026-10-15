import React from 'react';

import { Stack, Typography } from '@mui/material';

import { DailyWeather } from '../../../shared/weather/weather';
import WeatherItemRow from './WeatherItemRow';

interface Props {
  dailyWeather: DailyWeather;
}
interface State {}

export default class WeatherSunriseSunset extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override render() {
    const { dailyWeather } = this.props;

    return (
      <Stack>
        <WeatherItemRow
          label="Sunrise:"
          value={this.getDateTime(dailyWeather?.sunrise)}
        />
        <WeatherItemRow
          label="Sunset:"
          value={this.getDateTime(dailyWeather?.sunset)}
        />
      </Stack>
    );
  }

  private getDateTime(dateTimeStrings: string[]) {
    const today = new Date();

    for (const dateTimeString of dateTimeStrings) {
      const date = new Date(`${dateTimeString}Z`);

      const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();

      if (isToday) {
        return date.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        });
      }
    }

    return '';
  }
}
