import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from '../../../shared/weather/weather';
import { weatherStore, WeatherStore } from '../../store/weatherStore';
import { WeeatherEvents } from '../../store/Events';
import WeatherSevenDayForecast from '../../components/weather/WeatherSevenDayForecast';
import WeatherNow from '../../components/weather/WeatherNow';

interface Props {
  store: WeatherStore;
}
interface State {}

export default class Weather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override componentDidMount() {
    const { store } = this.props;
    store.loadWeather();

    store.addEventListener(WeeatherEvents.WeatherUpdate, this.update);
    store.addEventListener(WeeatherEvents.WeatherSettings, this.update);
  }

  override componentWillUnmount() {
    const { store } = this.props;
    store.removeEventListener(WeeatherEvents.WeatherUpdate, this.update);
    store.removeEventListener(WeeatherEvents.WeatherSettings, this.update);
  }

  private update = () => {
    this.forceUpdate();
  };

  override render() {
    const { store } = this.props;
    const { weather } = store;

    const cw: CurrentWeather = weather?.current;
    const hw: HourlyWeather = weather?.hourly;
    const dw: DailyWeather = weather?.daily;

    return (
      <Stack>
        <Typography>Current Weather</Typography>
        <Divider />
        <WeatherNow
          store={store}
          currentWeather={cw}
          hourlyWeather={hw}
          dailyWeather={dw}
        />
        <WeatherSevenDayForecast store={weatherStore} dailyWeather={dw} />
        {this.renderLastUpdated(cw)}
      </Stack>
    );
  }

  private renderLastUpdated(cw: CurrentWeather) {
    if (!cw?.time) return null;

    const updatedDate = new Date(`${cw.time}z`);

    return (
      <Stack direction="row" spacing={1}>
        <Typography>updated</Typography>
        <Stack direction="row" spacing={1}>
          <Typography>{updatedDate.toLocaleDateString()}</Typography>
          <Typography>{updatedDate.toLocaleTimeString()}</Typography>
        </Stack>
      </Stack>
    );
  }
}
