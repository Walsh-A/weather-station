import React from 'react';

import { IconButton, Stack, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import Settings from '../pages/Settings';
import { WeatherStore } from '../store/WeatherStore';
import { WeeatherEvents } from '../store/Events';
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from '../../shared/weather';
import WeatherNow from '../components/weather/WeatherNow';
import WeatherSevenDayForecast from '../components/weather/WeatherSevenDayForecast';
import WeatherAlert from './WeatherAlerts';
import TimeLocationInfo from '../components/TimeLocationInfo';

interface Props {}
interface State {}

const store = new WeatherStore();

export default class Weather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { openSettings: false };
  }

  override componentDidMount() {
    void store.loadData();

    store.addEventListener(WeeatherEvents.WeatherUpdate, this.update);
    store.addEventListener(WeeatherEvents.WeatherSettings, this.update);
    store.addEventListener(WeeatherEvents.WeatherSettingsOpen, this.update);
  }

  override componentWillUnmount() {
    store.removeEventListener(WeeatherEvents.WeatherUpdate, this.update);
    store.removeEventListener(WeeatherEvents.WeatherSettings, this.update);
    store.removeEventListener(WeeatherEvents.WeatherSettingsOpen, this.update);
  }

  private update = () => {
    this.forceUpdate();
  };

  override render() {
    const { settingsOpen, zipCode } = store;

    if (settingsOpen || zipCode === null) {
      return <Settings store={store} />;
    }

    return this.renderWeatherContent();
  }

  private renderWeatherContent() {
    const { weather } = store;

    const cw: CurrentWeather = weather?.current;
    const hw: HourlyWeather = weather?.hourly;
    const dw: DailyWeather = weather?.daily;

    return (
      <>
        <Stack>
          <WeatherAlert />
          <TimeLocationInfo store={store} />
          <WeatherNow
            store={store}
            currentWeather={cw}
            hourlyWeather={hw}
            dailyWeather={dw}
          />
          <WeatherSevenDayForecast store={store} dailyWeather={dw} />
          {this.renderLastUpdated(cw)}
        </Stack>
        {this.renderSettingsButton()}
      </>
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

  private renderSettingsButton() {
    const { settingsOpen } = store;

    return (
      <IconButton onClick={() => (store.settingsOpen = !settingsOpen)}>
        <SettingsIcon />
      </IconButton>
    );
  }
}
