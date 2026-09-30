import React from 'react';

import { Stack } from '@mui/material';

import WeatherItemRow from './WeatherItemRow';
import { CurrentWeather, SpeedUnit } from '../../../shared/weather/weather';
import { Conversions } from '../../../shared/utilityConversions';

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
          value={this.convertSpeedUnits(cw.wind_speed_10m)}
          unit={speedUnit}
        />
        <WeatherItemRow
          label="Wind Gusts:"
          value={this.convertSpeedUnits(cw.wind_gusts_10m)}
          unit={speedUnit}
        />
        <WeatherItemRow
          label="Wind Direction:"
          value={cw.wind_direction_10m}
          unit={`\u00B0`}
        />
      </Stack>
    );
  }

  private convertSpeedUnits(value: number): number {
    const { speedUnit } = this.props;

    if (speedUnit === SpeedUnit.KPH) return value;

    return Conversions.kilometerPerHourToMilePerHour(value) ?? value;
  }
}
