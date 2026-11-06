import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import { CurrentWeather } from '../../../shared/weather';
import { Conversions } from '../../../shared/utilityConversions';
import WindVane from './WindVane';
import { WeatherStore } from '../../store/WeatherStore';
import LabelValueRow from '../display/LabelValueRow';

interface Props {
  store: WeatherStore;
  currentWeather: CurrentWeather;
}

export default class WeatherWinds extends React.Component<Props> {
  override render() {
    const { store, currentWeather: cw } = this.props;
    const { speedUnit, degreeSymbol } = store;

    return (
      <Stack direction="row">
        <Stack>
          <LabelValueRow
            label="Direction"
            value={cw.wind_direction_10m + degreeSymbol}
          />
          <LabelValueRow
            label="Wind"
            value={`${Conversions.convertSpeedUnits(cw.wind_speed_10m, speedUnit)} ${speedUnit}`}
          />
          <LabelValueRow
            label="Gusting"
            value={`${Conversions.convertSpeedUnits(cw.wind_gusts_10m, speedUnit)} ${speedUnit}`}
          />
          <LabelValueRow
            label="Pressure"
            value={`${Conversions.convertPascalToInHg(cw.pressure_msl)} inHg`}
          />
        </Stack>
        <WindVane currentWeather={cw} compassSize={100} />
      </Stack>
    );
  }
}
