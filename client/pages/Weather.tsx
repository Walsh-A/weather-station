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
interface State {
  alertsVisible: boolean;
}

const store = new WeatherStore();
// api updates data every 15 minutes on the hour
// wait one minute after that to pull data again
const WEATHER_REFRESH_INTERVAL_MINUTES = 15;
const WEATHER_REFRESH_DELAY_MINUTES = 1;

export default class Weather extends React.Component<Props, State> {
  private weatherRefreshTimer: number | undefined;

  override state: State = {
    alertsVisible: false,
  };

  override componentDidMount() {
    void store.loadData();

    store.addEventListener(WeeatherEvents.WeatherUpdate, this.update);
    store.addEventListener(WeeatherEvents.WeatherSettings, this.update);
    store.addEventListener(WeeatherEvents.WeatherSettingsOpen, this.update);
    window.addEventListener('keydown', this.handleKeyDown);
    this.scheduleWeatherRefresh();
  }

  override componentWillUnmount() {
    store.removeEventListener(WeeatherEvents.WeatherUpdate, this.update);
    store.removeEventListener(WeeatherEvents.WeatherSettings, this.update);
    store.removeEventListener(WeeatherEvents.WeatherSettingsOpen, this.update);
    window.removeEventListener('keydown', this.handleKeyDown);

    if (this.weatherRefreshTimer !== undefined) {
      window.clearTimeout(this.weatherRefreshTimer);
    }
  }

  private update = () => {
    this.forceUpdate();
  };

  private scheduleWeatherRefresh = () => {
    const now = new Date();
    const nextRefresh = new Date(now);
    const currentQuarter = Math.floor(
      now.getMinutes() / WEATHER_REFRESH_INTERVAL_MINUTES,
    );

    nextRefresh.setSeconds(0, 0);
    nextRefresh.setMinutes(
      currentQuarter * WEATHER_REFRESH_INTERVAL_MINUTES +
        WEATHER_REFRESH_DELAY_MINUTES,
    );

    if (nextRefresh.getTime() <= now.getTime()) {
      nextRefresh.setMinutes(
        nextRefresh.getMinutes() + WEATHER_REFRESH_INTERVAL_MINUTES,
      );
    }

    this.weatherRefreshTimer = window.setTimeout(
      this.refreshWeather,
      nextRefresh.getTime() - now.getTime(),
    );
  };

  private refreshWeather = () => {
    this.scheduleWeatherRefresh();
    void store.loadWeather();
  };

  private handleAlertVisibilityChange = (alertsVisible: boolean) => {
    this.setState({ alertsVisible });
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
        <WeatherAlert onVisibilityChange={this.handleAlertVisibilityChange} />
        <Stack sx={{ flex: 1, minHeight: 0 }}>
          <WeatherNow
            store={store}
            currentWeather={cw}
            hourlyWeather={hw}
            dailyWeather={dw}
          />
          <Stack
            sx={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <WeatherSevenDayForecast store={store} dailyWeather={dw} />
          </Stack>
          {this.renderLastUpdated(cw)}
        </Stack>
      </Stack>
    );
  }

  private renderLastUpdated(cw: CurrentWeather) {
    if (!cw?.time) return null;

    const { alertsVisible } = this.state;
    const updatedDate = new Date(`${cw.time}z`);

    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignSelf: 'end',
          mb: alertsVisible ? 0.5 : 0,
          mr: 1,
          mt: -0.25,
          opacity: 0.5,
        }}
      >
        <Typography variant="caption">{`UPDATED ${updatedDate.toLocaleDateString()} ${updatedDate.toLocaleTimeString()}`}</Typography>
      </Stack>
    );
  }
}
