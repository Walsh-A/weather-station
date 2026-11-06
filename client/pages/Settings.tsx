import React from 'react';

import { Divider, IconButton, Stack, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

import WeatherUserControls from '../components/weather/WeatherUserControls';
import { WeatherStore } from '../store/weatherStore';

interface Props {
  store: WeatherStore;
}
interface State {}

export default class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override componentDidMount() {}

  override render() {
    const { store } = this.props;

    return (
      <Stack
        sx={{
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        {this.renderWeatherSettings()}
        <IconButton
          sx={{ position: 'absolute', right: 8, top: 8 }}
          onClick={() => (store.settingsOpen = false)}
        >
          <Close />
        </IconButton>
      </Stack>
    );
  }

  private renderWeatherSettings() {
    const { store } = this.props;

    return (
      <Stack spacing={1} sx={{ maxWidth: 452, width: '100%' }}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Weather Settings
        </Typography>
        <Divider />
        <WeatherUserControls store={store} />
      </Stack>
    );
  }
}
