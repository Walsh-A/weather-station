import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import WeatherTemperatures from '../../components/weather/WeatherTemperatures';
import WeatherWinds from '../../components/weather/WeatherWinds';
import WeatherPrecipitation from '../../components/weather/WeatherPrecipitation';
import WeatherCode from '../../components/weather/WeatherCode';
import { WeatherStore } from '../../store/weatherStore';
import WeatherSunriseSunset from '../../components/weather/WeatherSunriseSunset';
import { WeeatherEvents } from '../../store/Events';
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from '../../../shared/weather';
import { Conversions } from '../../../shared/utilityConversions';
import { WeatherTools } from '../../../shared/weatherTools';

interface Props {
  store: WeatherStore;
  currentWeather: CurrentWeather;
  hourlyWeather: HourlyWeather;
  dailyWeather: DailyWeather;
}
interface State {}

export default class WeatherNow extends React.Component<Props, State> {
  private readonly degreeSymbol = '\u00B0';

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override componentDidMount() {
    const { store } = this.props;
    store.addEventListener(WeeatherEvents.WeatherSettings, this.update);
  }

  override componentWillUnmount() {
    const { store } = this.props;
    store.removeEventListener(WeeatherEvents.WeatherSettings, this.update);
  }

  private update = () => {
    this.forceUpdate();
  };

  override render() {
    const { store, currentWeather: cw, dailyWeather: dw } = this.props;
    const { tempUnit } = store;

    const degreeUnit = `${this.degreeSymbol}${tempUnit}`;

    return (
      <Stack sx={{ margin: 1 }}>
        <Stack direction="row" style={{ justifyContent: 'space-between' }}>
          <WeatherCode weatherCode={cw.weather_code} />
          <Stack style={{ textAlign: 'center' }}>
            {this.renderCurrentTemp(degreeUnit)}
            <WeatherTemperatures
              store={store}
              currentWeather={cw}
              dailyWeather={dw}
            />
          </Stack>
          {this.renderPrecipitationLine()}
          <WeatherWinds currentWeather={cw} speedUnit={store.speedUnit} />
        </Stack>
        <WeatherSunriseSunset dailyWeather={dw} sliderWidth={500} />
      </Stack>
    );
  }

  private renderCurrentTemp(degreeUnit: string) {
    const { store, currentWeather: cw } = this.props;
    const { tempUnit } = store;

    return (
      <Typography variant="h3">
        {Conversions.convertTempUnit(cw.temperature_2m, tempUnit, 0)}
        {degreeUnit}
      </Typography>
    );
  }

  private renderPrecipitationLine() {
    const { currentWeather: cw, hourlyWeather: hw } = this.props;

    const precipitationProb = WeatherTools.getCurrentPrecipitationProbability(
      hw,
      cw,
    );

    //TODO: add in rain/snow etc if any exists

    return (
      <Stack>
        {this.renderDisplayRow('Precipitation', precipitationProb + '%')}
        {this.renderDisplayRow('Humidity', cw.relative_humidity_2m + '%')}
        {this.renderDisplayRow(
          'Dew Point',
          `${Conversions.celsiusToFahrenheit(cw.dewpoint_2m)}${this.degreeSymbol}`,
        )}
        {this.renderVisibility()}
      </Stack>
    );
  }

  private renderVisibility() {
    const { currentWeather: cw } = this.props;
    const { visibility } = cw;

    return (
      <Stack direction="row" spacing={1}>
        <Typography style={{ opacity: 0.5 }}>Visibility</Typography>
        <Typography>{`${Conversions.meterToMile(Number(visibility), 2)} mi`}</Typography>
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
