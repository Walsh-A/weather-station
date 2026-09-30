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
          value={this.convertTempUnits(currentWeather.temperature_2m)}
          unit={degreeUnit}
        />
        <WeatherItemRow
          label="Feels Like"
          value={this.convertTempUnits(currentWeather.apparent_temperature)}
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

  private convertTempUnits(value: number): number {
    const { temperatureUnit } = this.props;

    if (temperatureUnit === TemperatureUnit.C) return value;

    return Conversions.celsiusToFahrenheit(value) ?? value;
  }
}
