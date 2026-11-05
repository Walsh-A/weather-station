import React from 'react';

import { Stack, Typography } from '@mui/material';

import { WeatherStore } from '../store/weatherStore';
import { WeeatherEvents } from '../store/Events';
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from '../../shared/weather';
import WeatherNow from '../components/weather/WeatherNow';
import WeatherSevenDayForecast from '../components/weather/WeatherSevenDayForecast';

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
        <WeatherNow
          store={store}
          currentWeather={cw}
          hourlyWeather={hw}
          dailyWeather={dw}
        />
        <WeatherSevenDayForecast store={store} dailyWeather={dw} />
        {this.renderLastUpdated(cw)}
      </Stack>
    );
  }

  private renderLastUpdated(cw: CurrentWeather) {
    if (!cw?.time) return null;

    const updatedDate = new Date(`${cw.time}z`);

    return (
      <Stack direction="row" spacing={1} style={{ alignSelf: 'end' }}>
        <Typography variant="caption">{`UPDATED ${updatedDate.toLocaleDateString()} ${updatedDate.toLocaleTimeString()}`}</Typography>
      </Stack>
    );
  }
}
