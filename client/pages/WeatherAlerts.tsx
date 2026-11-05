import React from 'react';

import { Alert, Stack, Typography } from '@mui/material';

import { NwsAlertCollection, NwsAlertFeature } from '../../shared/weatherAlert';

interface Props {}

interface State {
  weatherAlerts: NwsAlertCollection;
}

export default class WeatherAlert extends React.Component<Props, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      weatherAlerts: new NwsAlertCollection(),
    };
  }

  override componentDidMount() {
    this.loadWeatherAlerts();
  }

  async loadWeatherAlerts() {
    try {
      const response = await fetch('/api/alerts');

      if (!response.ok) {
        throw new Error('Failed to retrieve weather alert data.');
      }

      const data: NwsAlertCollection = await response.json();

      this.setState({
        weatherAlerts: data,
      });
    } catch (err) {
      console.log(
        'ERROR',
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    }
  }

  override render() {
    const { weatherAlerts } = this.state;

    if (!weatherAlerts.features.length) return null;

    return (
      <Stack spacing={1}>
        {weatherAlerts.features.map((alert) =>
          this.renderWeatherAlert(alert),
        )}
      </Stack>
    );
  }

  private renderWeatherAlert(alert: NwsAlertFeature) {
    const { properties } = alert;

    return (
      <Alert key={alert.id} severity="warning">
        <Stack>
          <Typography sx={{ fontWeight: 'bold' }}>{properties.event}</Typography>
          {properties.headline && <Typography>{properties.headline}</Typography>}
          {properties.areaDesc && (
            <Typography variant="body2">{properties.areaDesc}</Typography>
          )}
        </Stack>
      </Alert>
    );
  }
}
