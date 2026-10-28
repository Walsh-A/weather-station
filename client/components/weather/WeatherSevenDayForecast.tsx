import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import { WeatherStore } from '../../store/weatherStore';
import { DailyWeather } from '../../../shared/weather/weather';
import WeatherCode from './WeatherCode';
import WeatherItemRow from './WeatherItemRow';
import { Conversions } from '../../../shared/utilityConversions';

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
    return (
      <Stack>
        <Typography>Seven Day Forecast</Typography>
        <Divider />
        {this.renderForecast()}
      </Stack>
    );
  }

  private renderForecast() {
    const { store, dailyWeather } = this.props;
    const { tempUnit } = store;

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
          sx={{ width: '100%', justifyContent: 'space-evenly' }}
        >
          <Typography>{this.formatForecastDate(dateString)}</Typography>
          <WeatherCode weatherCode={weatherCode} dataRow={true} />
          <WeatherItemRow
            label="High:"
            value={Conversions.convertTempUnit(highTemperature, tempUnit)}
            unit={tempUnit}
          />
          <WeatherItemRow
            label="Low:"
            value={Conversions.convertTempUnit(lowTemperature, tempUnit)}
            unit={tempUnit}
          />
          <WeatherItemRow
            label="Chance of Precipitation:"
            value={precipitationProbability}
            unit="%"
          />
          <Typography>
            {`${this.formatUtcTime(sunriseTime)} - ${this.formatUtcTime(
              sunsetTime,
            )}`}
          </Typography>
        </Stack>,
      );
    }

    return (
      <Stack direction="row" spacing={2}>
        {items}
      </Stack>
    );
  }

  private formatForecastDate(dateString: string): string {
    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString([], {
      weekday: 'long',
      month: '2-digit',
      day: '2-digit',
    });
  }

  private formatUtcTime(timeString: string): string {
    const date = new Date(`${timeString}Z`);

    if (Number.isNaN(date.getTime())) return timeString;

    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}
