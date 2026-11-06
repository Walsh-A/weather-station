import React from 'react';

import { Stack, Typography } from '@mui/material';

import { WeeatherEvents } from '../store/Events';
import { WeatherStore } from '../store/WeatherStore';

interface Props {
  store: WeatherStore;
}
interface State {}

export default class TimeLocationInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override componentDidMount() {
    const { store } = this.props;
    store.addEventListener(WeeatherEvents.WeatherLocation, this.update);
  }

  override componentWillUnmount() {
    const { store } = this.props;
    store.removeEventListener(WeeatherEvents.WeatherLocation, this.update);
  }

  private update = () => {
    this.forceUpdate();
  };

  override render() {
    const { store } = this.props;
    const { location } = store;

    const now = new Date();

    const dateString = now.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const timeString = now.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    return (
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          mr: 0.5,
          ml: 0.5,
          borderBottom: '1px solid black',
        }}
      >
        <Typography>{timeString}</Typography>
        <Typography>{dateString}</Typography>
        {location && (
          <Typography>
            {location.name}, {location.state}
          </Typography>
        )}
      </Stack>
    );
  }
}
