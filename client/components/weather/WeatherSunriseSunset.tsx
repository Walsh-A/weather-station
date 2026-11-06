import React from 'react';

import { Slider, Stack, Typography } from '@mui/material';
import { Brightness3, Sunny } from '@mui/icons-material';

import { DailyWeather } from '../../../shared/weather';
import LabelValueRow from '../display/LabelValueRow';

interface Props {
  dailyWeather: DailyWeather;
  sliderWidth: number;
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
    const { dailyWeather, sliderWidth } = this.props;

    const sunrise = this.getTodayDateTime(dailyWeather?.sunrise ?? []);
    const sunset = this.getTodayDateTime(dailyWeather?.sunset ?? []);

    if (!sunrise || !sunset) return null;

    const now = Date.now();
    const min = sunrise.getTime();
    const max = sunset.getTime();
    const sliderValue = Math.min(Math.max(now, min), max);

    return (
      <Stack sx={{ width: sliderWidth, alignSelf: 'center' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
                opacity: 0.5,
              },
              '& .MuiSlider-thumb svg': {
                color: 'common.black',
                fontSize: 24,
              },
            }}
          />
          <Brightness3 sx={{ transform: 'rotate(180deg)' }} />
        </Stack>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="caption">
            {sunrise.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </Typography>
          <Typography variant="caption">
            {sunset.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </Typography>
        </Stack>
      </Stack>
    );
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
