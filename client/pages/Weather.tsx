import React from 'react';

import { IconButton, Stack, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import Settings from '../pages/Settings';
import { WeatherStore } from '../store/weatherStore';
import { WeeatherEvents } from '../store/Events';
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from '../../shared/weather';
import WeatherNow from '../components/weather/WeatherNow';
import WeatherSevenDayForecast from '../components/weather/WeatherSevenDayForecast';

interface Props {}
interface State {}

const weatherStore = new WeatherStore();

export default class Weather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { openSettings: false };
  }

  override componentDidMount() {
    weatherStore.loadWeather();
    weatherStore.loadSettings();

    weatherStore.addEventListener(WeeatherEvents.WeatherUpdate, this.update);
    weatherStore.addEventListener(WeeatherEvents.WeatherSettings, this.update);
    weatherStore.addEventListener(
      WeeatherEvents.WeatherSettingsOpen,
      this.update,
    );
  }

  override componentWillUnmount() {
    weatherStore.removeEventListener(WeeatherEvents.WeatherUpdate, this.update);
    weatherStore.removeEventListener(
      WeeatherEvents.WeatherSettings,
      this.update,
    );
    weatherStore.removeEventListener(
      WeeatherEvents.WeatherSettingsOpen,
      this.update,
    );
  }

  private update = () => {
    this.forceUpdate();
  };

  override render() {
    const { settingsOpen } = weatherStore;

    if (settingsOpen) {
      return <Settings store={weatherStore} />;
    }

    return this.renderWeatherContent();
  }

  private renderWeatherContent() {
    const { weather } = weatherStore;

    const cw: CurrentWeather = weather?.current;
    const hw: HourlyWeather = weather?.hourly;
    const dw: DailyWeather = weather?.daily;

    return (
      <>
        <Stack>
          <WeatherNow
            store={weatherStore}
            currentWeather={cw}
            hourlyWeather={hw}
            dailyWeather={dw}
          />
          <WeatherSevenDayForecast store={weatherStore} dailyWeather={dw} />
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
    const { settingsOpen } = weatherStore;

    return (
      <IconButton onClick={() => (weatherStore.settingsOpen = !settingsOpen)}>
        <SettingsIcon />
      </IconButton>
    );
  }
}
