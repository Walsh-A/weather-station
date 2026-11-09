import React from 'react';

import { Stack, Typography } from '@mui/material';

import { CurrentWeather, DailyWeather } from '../../../../shared/weather';
import { Conversions } from '../../../../shared/utilityConversions';
import { WeatherStore } from '../../../store/WeatherStore';
import HighLowDisplay from './HighLowDisplay';
import LabelValueRow from '../../display/LabelValueRow';

interface Props {
  store: WeatherStore;
  currentWeather: CurrentWeather;
  dailyWeather: DailyWeather;
}

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
      <Stack style={{ textAlign: 'center' }}>
        <Typography variant="h3">
          {Conversions.convertTempUnit(cw.temperature_2m, tempUnit, 0)}
          {degreeSymbol}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography style={{ opacity: 0.5 }}>Feels Like</Typography>
          <Typography>
            {feelsLike}
            {degreeSymbol}
          </Typography>
        </Stack>
        <LabelValueRow
          label="Dew Point"
          value={`${Conversions.celsiusToFahrenheit(cw.dewpoint_2m, 0)}${degreeSymbol}`}
        />
        <HighLowDisplay
          store={store}
          high={dw.temperature_2m_max[0]}
          low={dw.temperature_2m_min[0]}
        />
      </Stack>
    );
  }
}
