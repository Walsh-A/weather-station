import React from 'react';

import { Stack } from '@mui/material';

import {
  CurrentWeather,
  HourlyWeather,
  PrecipitationUnit,
} from '../../../shared/weather';
import { WeatherTools } from '../../../shared/weatherTools';
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

    const precipitationProb = WeatherTools.getCurrentPrecipitationProbability(
      hw,
      cw,
    );

    // TODO: id no precipitation values dont show the labels

    return (
      <Stack>
        <WeatherItemRow
          label="Chance of Precipitation:"
          value={precipitationProb}
          unit="%"
        />
        <WeatherItemRow
          label="Rain:"
          value={Conversions.convertPrecipitationUnits(
            cw.rain,
            precipitationUnit,
          )}
          unit={precipitationUnit}
        />
        <WeatherItemRow
          label="Showers:"
          value={Conversions.convertPrecipitationUnits(
            cw.showers,
            precipitationUnit,
          )}
          unit={precipitationUnit}
        />
        <WeatherItemRow
          label="Snowfall:"
          value={Conversions.convertPrecipitationUnits(
            cw.snowfall,
            precipitationUnit,
          )}
          unit={precipitationUnit}
        />
      </Stack>
    );
  }
}
