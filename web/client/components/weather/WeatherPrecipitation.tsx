import React from 'react';

import { Stack } from '@mui/material';

import { CurrentWeather, HourlyWeather } from '../../../shared/weather';
import { WeatherTools } from '../../../shared/weatherTools';
import { Conversions } from '../../../shared/utilityConversions';
import LabelValueRow from '../display/LabelValueRow';
import { WeatherStore } from '../../store/WeatherStore';

interface Props {
  store: WeatherStore;
  currentWeather: CurrentWeather;
  hourlyWeather: HourlyWeather;
}

export default class WeatherPrecipitation extends React.Component<Props> {
  override render() {
    const { currentWeather: cw, hourlyWeather: hw } = this.props;

    const precipitationProb = WeatherTools.getCurrentPrecipitationProbability(
      hw,
      cw,
    );

    return (
      <Stack>
        <LabelValueRow label="Precipitation:" value={`${precipitationProb}%`} />
        {this.renderRain()}
        {this.renderSnowfall()}
      </Stack>
    );
  }

  private renderRain() {
    const { store, currentWeather: cw } = this.props;
    const { precipitationUnit } = store;

    const rain = cw.rain;

    if (!rain || rain == 0) return null;

    return (
      <LabelValueRow
        label="Rain:"
        value={`${Conversions.convertPrecipitationUnits(
          rain,
          precipitationUnit,
        )} ${precipitationUnit}`}
      />
    );
  }

  private renderSnowfall() {
    const { store, currentWeather: cw } = this.props;
    const { precipitationUnit } = store;

    const snow = cw.snowfall;

    if (!snow || snow == 0) return null;

    return (
      <LabelValueRow
        label="Snowfall:"
        value={`${Conversions.convertPrecipitationUnits(
          cw.snowfall,
          precipitationUnit,
        )} ${precipitationUnit}`}
      />
    );
  }
}
