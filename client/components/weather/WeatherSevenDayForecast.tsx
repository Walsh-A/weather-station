import React from 'react';

import { Stack, Typography } from '@mui/material';

import { WeatherStore } from '../../store/weatherStore';
import { DailyWeather } from '../../../shared/weather';
import WeatherCode from './WeatherCode';
import WeatherItemRow from './WeatherItemRow';
import { Conversions } from '../../../shared/utilityConversions';
import { WbTwilight } from '@mui/icons-material';

interface Props {
  store: WeatherStore;
  dailyWeather: DailyWeather;
}

interface State {}

export default class WeatherSevenDayForecast extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override render() {
    const { dailyWeather } = this.props;

    const {
      time,
      weather_code,
      temperature_2m_max,
      temperature_2m_min,
      precipitation_probability_max,
      sunrise,
      sunset,
    } = dailyWeather;

    const items = [];

    for (let x = 0; x < time.length; x++) {
      const dateString = time[x];
      const weatherCode = weather_code[x];
      const highTemperature = temperature_2m_max[x];
      const lowTemperature = temperature_2m_min[x];
      const precipitationProbability = precipitation_probability_max[x];
      const sunriseTime = sunrise[x];
      const sunsetTime = sunset[x];

      if (
        dateString === undefined ||
        weatherCode === undefined ||
        highTemperature === undefined ||
        lowTemperature === undefined ||
        precipitationProbability === undefined ||
        sunriseTime === undefined ||
        sunsetTime === undefined
      ) {
        continue;
      }

      items.push(
        <Stack
          key={dateString}
          style={{
            border: '1px solid #000',
            borderRadius: 4,
            alignItems: 'center',
          }}
        >
          <Typography>{this.formatForecastDate(dateString)}</Typography>
          <WeatherCode weatherCode={weatherCode} />
          {this.renderTemps(highTemperature, lowTemperature)}
          <WeatherItemRow
            label="Precip:"
            value={precipitationProbability}
            unit="%"
          />
          <Typography variant="caption">
            {`${this.formatUtcTime(sunriseTime)} - ${this.formatUtcTime(
              sunsetTime,
            )}`}
          </Typography>
        </Stack>,
      );
    }

    return (
      <Stack direction="row" spacing={2} style={{ alignSelf: 'center' }}>
        {items}
      </Stack>
    );
  }

  private formatForecastDate(dateString: string): string {
    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString([], {
      weekday: 'short',
      month: '2-digit',
      day: '2-digit',
    });
  }

  private renderTemps(high: number, low: number) {
    const { store } = this.props;
    const { tempUnit, degreeSymbol } = store;

    const h = Conversions.convertTempUnit(high, tempUnit, 0);
    const l = Conversions.convertTempUnit(low, tempUnit, 0);

    return (
      <Stack direction="row">
        <Typography>{`${h}${degreeSymbol} / ${l}${degreeSymbol}`}</Typography>
      </Stack>
    );
  }

  private formatUtcTime(timeString: string): string {
    const date = new Date(`${timeString}Z`);

    if (Number.isNaN(date.getTime())) return timeString;

    return date
      .toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })
      .replace(/\s?[AP]M$/, '');
  }
}
