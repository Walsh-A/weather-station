import React from 'react';

import { Stack, Typography } from '@mui/material';

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
  override componentDidMount() {
    void store.loadData();

    store.addEventListener(WeeatherEvents.WeatherUpdate, this.update);
    store.addEventListener(WeeatherEvents.WeatherSettings, this.update);
    store.addEventListener(WeeatherEvents.WeatherSettingsOpen, this.update);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  override componentWillUnmount() {
    store.removeEventListener(WeeatherEvents.WeatherUpdate, this.update);
    store.removeEventListener(WeeatherEvents.WeatherSettings, this.update);
    store.removeEventListener(WeeatherEvents.WeatherSettingsOpen, this.update);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  private update = () => {
    this.forceUpdate();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const { settingsOpen } = store;

    if (event.key === 'Escape' && settingsOpen) {
      store.settingsOpen = false;
      return;
    }

    if (
      event.key.toLowerCase() !== 's' ||
      settingsOpen ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      this.isEditableTarget(event.target)
    ) {
      return;
    }

    store.settingsOpen = true;
  };

  private isEditableTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return false;

    return (
      target.isContentEditable ||
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
    );
  }

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
      <Stack sx={{ height: '100%' }}>
        <TimeLocationInfo store={store} />
        <WeatherAlert />
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
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignSelf: 'end', mt: 'auto', mr: 1, opacity: 0.5 }}
      >
        <Typography variant="caption">{`UPDATED ${updatedDate.toLocaleDateString()} ${updatedDate.toLocaleTimeString()}`}</Typography>
      </Stack>
    );
  }
}
