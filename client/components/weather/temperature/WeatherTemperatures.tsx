import React from 'react';

import { Stack, Typography } from '@mui/material';

import { CurrentWeather, DailyWeather } from '../../../../shared/weather';
import { Conversions } from '../../../../shared/utilityConversions';
import { WeatherStore } from '../../../store/WeatherStore';
import HighLowDisplay from './HighLowDisplay';

interface Props {
  store: WeatherStore;
  currentWeather: CurrentWeather;
  dailyWeather: DailyWeather;
}

//TODO: this should be a reusable component used in the 7 day forecast as well as the current weather

export default class WeatherTemperatures extends React.Component<Props> {
  override render() {
    const { store, currentWeather: cw, dailyWeather: dw } = this.props;
    const { tempUnit, degreeSymbol } = store;

    const feelsLike = Conversions.convertTempUnit(
      cw.apparent_temperature,
      tempUnit,
      0,
    );

    return (
      <Stack>
        <Stack direction="row" spacing={1}>
          <Typography style={{ opacity: 0.5 }}>Feels Like</Typography>
          <Typography>
            {feelsLike}
            {degreeSymbol}
          </Typography>
        </Stack>
        <HighLowDisplay
          store={store}
          high={dw.temperature_2m_max[0]}
          low={dw.temperature_2m_min[0]}
        />
      </Stack>
    );
  }
}
