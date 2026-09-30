import React from 'react';

import { Stack } from '@mui/material';

import {
  CurrentWeather,
  HourlyWeather,
  PrecipitationUnit,
} from '../../../shared/weather/weather';
import { WeatherTools } from '../../../shared/weather/weatherTools';
import WeatherItemRow from '../../components/weather/WeatherItemRow';
import { Conversions } from '../../../shared/utilityConversions';

interface Props {
  currentWeather: CurrentWeather;
  hourlyWeather: HourlyWeather;
  precipitationUnit: PrecipitationUnit;
}

export default class WeatherPrecipitation extends React.Component<Props> {
  override render() {
    const {
      currentWeather: cw,
      hourlyWeather: hw,
      precipitationUnit,
    } = this.props;

    const precipitationProp = WeatherTools.getCurrentPrecipitationProbability(
      hw,
      cw,
    );

    // TODO: id no precipitation values dont show the labels

    return (
      <Stack>
        <WeatherItemRow
          label="Chance of Precipitation:"
          value={precipitationProp}
          unit="%"
        />
        <WeatherItemRow
          label="Rain:"
          value={this.convertPrecipitationUnits(cw.rain)}
          unit={precipitationUnit}
        />
        <WeatherItemRow
          label="Showers:"
          value={this.convertPrecipitationUnits(cw.showers)}
          unit={precipitationUnit}
        />
        <WeatherItemRow
          label="Snowfall:"
          value={this.convertPrecipitationUnits(cw.snowfall)}
          unit={precipitationUnit}
        />
      </Stack>
    );
  }

  private convertPrecipitationUnits(value: number): number {
    const { precipitationUnit } = this.props;

    if (precipitationUnit === PrecipitationUnit.mm) return value;

    return Conversions.millimeterToInch(value) ?? value;
  }
}
