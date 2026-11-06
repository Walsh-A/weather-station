import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import { SpeedUnit } from '../../../shared/settings';
import { CurrentWeather } from '../../../shared/weather';
import { Conversions } from '../../../shared/utilityConversions';
import WindVane from './WindVane';

interface Props {
  currentWeather: CurrentWeather;
  speedUnit: SpeedUnit;
}

export default class WeatherWinds extends React.Component<Props> {
  private readonly degreeSymbol = '\u00B0';

  override render() {
    const { currentWeather: cw, speedUnit } = this.props;

    return (
      <Stack style={{ alignItems: 'center' }} spacing={1}>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <WindVane currentWeather={cw} compassSize={100} />
          <Typography>{cw.wind_direction_10m + this.degreeSymbol}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {this.renderDisplayRow(
            'Wind',
            `${Conversions.convertSpeedUnits(cw.wind_speed_10m, speedUnit)}  ${speedUnit}`,
          )}
          <Divider orientation="vertical" style={{ height: 16, width: 4 }} />
          {this.renderDisplayRow(
            'Gusting',
            `${Conversions.convertSpeedUnits(cw.wind_gusts_10m, speedUnit)} ${speedUnit}`,
          )}
        </Stack>
        {this.renderDisplayRow(
          'Pressure',
          `${Conversions.convertPascalToInHg(cw.pressure_msl)} inHg`,
        )}
      </Stack>
    );
  }

  private renderDisplayRow(label: string, value: string | number) {
    // todo make this a reusable component that can be used in other places
    return (
      <Stack direction="row" spacing={1}>
        <Typography style={{ opacity: 0.5 }}>{label}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    );
  }
}
