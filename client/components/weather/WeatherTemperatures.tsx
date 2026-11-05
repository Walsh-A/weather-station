import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import {
  CurrentWeather,
  DailyWeather,
  TemperatureUnit,
} from '../../../shared/weather';
import { Conversions } from '../../../shared/utilityConversions';

interface Props {
  currentWeather: CurrentWeather;
  dailyWeather: DailyWeather;
  temperatureUnit: TemperatureUnit;
}

export default class WeatherTemperatures extends React.Component<Props> {
  override render() {
    const {
      currentWeather: cw,
      dailyWeather: dw,
      temperatureUnit: tempUnit,
    } = this.props;

    return (
      <Stack direction="row" spacing={1}>
        {this.renderDisplayRow(
          'Feels Like',
          Conversions.convertTempUnit(cw.apparent_temperature, tempUnit, 0),
        )}
        <Divider orientation="vertical" style={{ height: 16, width: 4 }} />
        {this.renderDisplayRow(
          'H',
          Conversions.convertTempUnit(
            Number(dw.temperature_2m_max[0]),
            tempUnit,
            0,
          ),
        )}
        <Divider orientation="vertical" style={{ height: 16, width: 4 }} />
        {this.renderDisplayRow(
          'L',
          Conversions.convertTempUnit(
            Number(dw.temperature_2m_min[0]),
            tempUnit,
            0,
          ),
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
