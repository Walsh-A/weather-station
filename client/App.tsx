import React from 'react';

import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import Weather from './pages/Weather';
import WeatherAlert from './pages/WeatherAlerts';
import Settings from './pages/Settings';
import { WeatherStore } from './store/weatherStore';
import DisplayFrame from './components/weather/DisplayFrame';
import TodayInfo from './components/TodayInfo';

interface Props {}
interface State {
  openSettings: boolean;
}

// TODO: this should move to the weather page when info is moved from store to db
const weatherStore = new WeatherStore();

export default class App extends React.Component<Props, State> {
  constructor(props: object) {
    super(props);

    this.state = { openSettings: false };
  }

  override componentDidMount() {}

  override render() {
    const { openSettings } = this.state;

    return (
      <DisplayFrame>
        <WeatherAlert />
        <TodayInfo />
        <Weather store={weatherStore} />
        {/* //TODO: Remove border for production */}
        <IconButton
          onClick={() => this.setState({ openSettings: !openSettings })}
        >
          <SettingsIcon />
        </IconButton>
        <Settings
          weatherStore={weatherStore}
          isOpen={openSettings}
          onClose={() => this.setState({ openSettings: false })}
        />
      </DisplayFrame>
    );
  }
}
