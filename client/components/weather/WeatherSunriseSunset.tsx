import React from 'react';

import { Slider, Stack, Typography } from '@mui/material';

import { DailyWeather } from '../../../shared/weather/weather';
import WeatherItemRow from './WeatherItemRow';
import { Brightness3, Sunny } from '@mui/icons-material';
import { CSSProperties } from '@mui/material/styles';

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
        {this.renderSunPositionSlider()}
      </Stack>
    );
  }

  private renderSunPositionSlider() {
    const { dailyWeather } = this.props;

    const sunrise = this.getTodayDateTime(dailyWeather?.sunrise ?? []);
    const sunset = this.getTodayDateTime(dailyWeather?.sunset ?? []);

    if (!sunrise || !sunset) return null;

    const now = Date.now();
    const min = sunrise.getTime();
    const max = sunset.getTime();
    const sliderValue = Math.min(Math.max(now, min), max);

    const timeLabelStyle: CSSProperties = { width: 115 };

    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', width: 500 }}
      >
        <Typography style={timeLabelStyle}>
          {sunrise.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Typography>
        <Sunny />
        <Slider
          disabled
          value={sliderValue}
          min={min}
          max={max}
          sx={{
            color: 'common.black',
            pointerEvents: 'none',
            '&.Mui-disabled': {
              color: 'common.black',
              opacity: 1,
            },
            '& .MuiSlider-rail': {
              opacity: 1,
            },
            '& .MuiSlider-thumb svg': {
              color: 'common.black',
              fontSize: 24,
            },
          }}
        />
        <Brightness3 sx={{ transform: 'rotate(180deg)' }} />
        <Typography style={timeLabelStyle}>
          {sunset.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Typography>
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

  private getTodayDateTime(dateTimeStrings: string[]) {
    const today = new Date();

    for (const dateTimeString of dateTimeStrings) {
      const date = new Date(`${dateTimeString}Z`);

      const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();

      if (isToday) {
        return date;
      }
    }

    return null;
  }
}
