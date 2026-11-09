import React from 'react';

import { Stack, Typography } from '@mui/material';

import { WeeatherEvents } from '../store/Events';
import { WeatherStore } from '../store/WeatherStore';

interface Props {
  store: WeatherStore;
}
interface State {
  now: Date;
}

export default class TimeLocationInfo extends React.Component<Props, State> {
  private clockInterval: number | undefined;

  constructor(props: Props) {
    super(props);

    this.state = { now: new Date() };
  }

  override componentDidMount() {
    const { store } = this.props;
    store.addEventListener(WeeatherEvents.WeatherLocation, this.update);
    this.clockInterval = window.setInterval(this.updateClock, 1000);
  }

  override componentWillUnmount() {
    const { store } = this.props;
    store.removeEventListener(WeeatherEvents.WeatherLocation, this.update);

    if (this.clockInterval !== undefined) {
      window.clearInterval(this.clockInterval);
    }
  }

  private update = () => {
    this.forceUpdate();
  };

  private updateClock = () => {
    const now = new Date();

    this.setState((state) => {
      const previous = state.now;
      const displayedTimeChanged =
        now.getFullYear() !== previous.getFullYear() ||
        now.getMonth() !== previous.getMonth() ||
        now.getDate() !== previous.getDate() ||
        now.getHours() !== previous.getHours() ||
        now.getMinutes() !== previous.getMinutes();

      return displayedTimeChanged ? { now } : null;
    });
  };

  override render() {
    const { store } = this.props;
    const { location } = store;
    const { now } = this.state;

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
