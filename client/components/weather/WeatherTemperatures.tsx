import React from 'react';

import { Stack } from '@mui/material';

import {
  CurrentWeather,
  TemperatureUnit,
} from '../../../shared/weather/weather';
import WeatherItemRow from './WeatherItemRow';
import { Conversions } from '../../../shared/utilityConversions';

interface Props {
  currentWeather: CurrentWeather;
  temperatureUnit: TemperatureUnit;
}

export default class WeatherTemperatures extends React.Component<Props> {
  private readonly degreeSymbol = '\u00B0';

  override render() {
    const { currentWeather, temperatureUnit } = this.props;

    const degreeUnit = `${this.degreeSymbol}${temperatureUnit}`;

    return (
      <Stack>
        <WeatherItemRow
          label="Current Temp:"
          value={Conversions.convertTempUnit(
            currentWeather.temperature_2m,
            temperatureUnit,
          )}
          unit={degreeUnit}
        />
        <WeatherItemRow
          label="Feels Like"
          value={Conversions.convertTempUnit(
            currentWeather.apparent_temperature,
            temperatureUnit,
          )}
          unit={degreeUnit}
        />
        <WeatherItemRow
          label="Humidity:"
          value={currentWeather.relative_humidity_2m}
          unit="%"
        />
      </Stack>
    );
  }
}
