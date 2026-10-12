import React from 'react';

import { Divider, IconButton, Stack, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import Weather from './pages/weather/Weather';
import WeatherAlert from './pages/weather/WeatherAlerts';
import News from './pages/news/News';
import Settings from './pages/Settings';
import { WeatherStore } from './store/weatherStore';

interface Props {}
interface State {
  openSettings: boolean;
}

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
      <Stack>
        {this.renderTitleBar()}
        <WeatherAlert />
        <Weather store={weatherStore} />
        <Divider />
        <News />
        <Settings
          weatherStore={weatherStore}
          isOpen={openSettings}
          onClose={() => this.setState({ openSettings: false })}
        />
      </Stack>
    );
  }

  private renderTitleBar() {
    const { openSettings } = this.state;

    return (
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h1">Home Station</Typography>
        <IconButton
          onClick={() => this.setState({ openSettings: !openSettings })}
        >
          <SettingsIcon />
        </IconButton>
      </Stack>
    );
  }
}
