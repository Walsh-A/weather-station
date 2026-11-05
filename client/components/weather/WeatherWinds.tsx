import React from 'react';

import { Stack } from '@mui/material';

import WeatherItemRow from './WeatherItemRow';
import { CurrentWeather, SpeedUnit } from '../../../shared/weather';
import { Conversions } from '../../../shared/utilityConversions';
import WindVane from './WindVane';

interface Props {
  currentWeather: CurrentWeather;
  speedUnit: SpeedUnit;
}

export default class WeatherWinds extends React.Component<Props> {
  override render() {
    const { currentWeather: cw, speedUnit } = this.props;

    return (
      <Stack>
        <WeatherItemRow
          label="Wind Speed:"
          value={Conversions.convertSpeedUnits(cw.wind_speed_10m, speedUnit)}
          unit={speedUnit}
        />
        <WeatherItemRow
          label="Wind Gusts:"
          value={Conversions.convertSpeedUnits(cw.wind_gusts_10m, speedUnit)}
          unit={speedUnit}
        />
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <WeatherItemRow
            label="Wind Direction:"
            value={cw.wind_direction_10m + `\u00B0`}
          />
          <WindVane currentWeather={cw} compassSize={60} />
        </Stack>
      </Stack>
    );
  }
}
