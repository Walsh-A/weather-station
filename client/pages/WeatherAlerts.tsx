import React from 'react';

import { Stack, Typography } from '@mui/material';
import { Warning } from '@mui/icons-material';

import {
  fakeWeatherAlerts,
  NwsAlertCollection,
  NwsAlertFeature,
} from '../../shared/weatherAlert';

interface Props {
  onVisibilityChange: (visible: boolean) => void;
}

interface State {
  weatherAlerts: NwsAlertCollection;
  currentAlertIndex: number;
}

const ALERT_CYCLE_INTERVAL_MS = 30_000; // cycle alerts every 30 seconds
const ALERT_REFRESH_INTERVAL_MS = 5 * 60_000; // check for new alerts every 5 minutes
const ALERT_HEIGHT = 58;

export default class WeatherAlert extends React.Component<Props, State> {
  private alertCycleTimer: number | undefined;
  private alertRefreshTimer: number | undefined;
  private alertRequestController: AbortController | undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      weatherAlerts: new NwsAlertCollection(),
      // weatherAlerts: fakeWeatherAlerts,
      currentAlertIndex: 0,
    };
  }

  override componentDidMount() {
    this.props.onVisibilityChange(this.state.weatherAlerts.features.length > 0);

    // Seeded alerts are used while developing/testing the display. Do not
    // immediately replace them with the live response (which may be empty).
    if (this.state.weatherAlerts.features.length === 0) {
      void this.loadWeatherAlerts();
    } else {
      this.configureAlertCycle();
    }

    this.alertRefreshTimer = window.setInterval(
      () => void this.loadWeatherAlerts(),
      ALERT_REFRESH_INTERVAL_MS,
    );
  }

  override componentWillUnmount() {
    this.clearAlertCycle();
    this.clearAlertRefresh();
    this.alertRequestController?.abort();
  }

  override componentDidUpdate(_previousProps: Props, previousState: State) {
    const wasVisible = previousState.weatherAlerts.features.length > 0;
    const isVisible = this.state.weatherAlerts.features.length > 0;

    if (wasVisible !== isVisible) {
      this.props.onVisibilityChange(isVisible);
    }
  }

  async loadWeatherAlerts() {
    if (this.alertRequestController) return;

    const controller = new AbortController();
    this.alertRequestController = controller;

    try {
      const response = await fetch('/api/alerts', {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve weather alert data.');
      }

      const data: NwsAlertCollection = await response.json();

      this.setState(({ currentAlertIndex, weatherAlerts }) => {
        const currentAlert = weatherAlerts.features[currentAlertIndex];
        const updatedIndex = currentAlert
          ? data.features.findIndex((alert) => alert.id === currentAlert.id)
          : -1;

        return {
          weatherAlerts: data,
          currentAlertIndex: updatedIndex >= 0 ? updatedIndex : 0,
        };
      }, this.configureAlertCycle);
    } catch (err) {
      if (controller.signal.aborted) return;

      console.log(
        'ERROR',
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    } finally {
      if (this.alertRequestController === controller) {
        this.alertRequestController = undefined;
      }
    }
  }

  override render() {
    const { currentAlertIndex, weatherAlerts } = this.state;
    const { features } = weatherAlerts;

    if (!features.length) return null;

    const alert = features[currentAlertIndex] ?? features[0];

    if (!alert) return null;

    return (
      <Stack spacing={1} sx={{ flexShrink: 0 }}>
        {this.renderWeatherAlert(
          alert,
          features.indexOf(alert) + 1,
          features.length,
        )}
      </Stack>
    );
  }

  private configureAlertCycle = () => {
    this.clearAlertCycle();

    if (this.state.weatherAlerts.features.length <= 1) return;

    this.alertCycleTimer = window.setInterval(() => {
      this.setState(({ currentAlertIndex, weatherAlerts }) => ({
        currentAlertIndex:
          (currentAlertIndex + 1) % weatherAlerts.features.length,
      }));
    }, ALERT_CYCLE_INTERVAL_MS);
  };

  private clearAlertCycle() {
    if (this.alertCycleTimer === undefined) return;

    window.clearInterval(this.alertCycleTimer);
    this.alertCycleTimer = undefined;
  }

  private clearAlertRefresh() {
    if (this.alertRefreshTimer === undefined) return;

    window.clearInterval(this.alertRefreshTimer);
    this.alertRefreshTimer = undefined;
  }

  private renderWeatherAlert(
    alert: NwsAlertFeature,
    alertIndex: number,
    alertCount: number,
  ) {
    const { properties } = alert;
    const { event, headline, areaDesc } = properties;

    return (
      <Stack
        key={alert.id}
        sx={{
          alignItems: 'center',
          backgroundColor: 'black',
          boxSizing: 'border-box',
          color: 'white',
          flexShrink: 0,
          height: ALERT_HEIGHT,
          justifyContent: 'center',
          overflow: 'hidden',
          px: 1,
          position: 'relative',
        }}
      >
        {alertCount > 1 && (
          <Typography
            aria-label={`Alert ${alertIndex} of ${alertCount}`}
            sx={{
              fontWeight: 'bold',
              position: 'absolute',
              right: 8,
              top: 4,
            }}
          >
            {alertIndex}/{alertCount}
          </Typography>
        )}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            maxWidth: 'calc(100% - 72px)',
            minWidth: 0,
          }}
        >
          <Warning sx={{ flexShrink: 0, fontSize: 20 }} />
          <Typography
            noWrap
            sx={{ fontWeight: 'bold', lineHeight: '20px', minWidth: 0 }}
          >
            {event}
          </Typography>
          <Warning sx={{ flexShrink: 0, fontSize: 20 }} />
        </Stack>
        {headline && (
          <Typography
            noWrap
            sx={{
              boxSizing: 'border-box',
              lineHeight: '20px',
              px: 5,
              textAlign: 'center',
              width: '100%',
            }}
          >
            {headline}
          </Typography>
        )}
        {areaDesc && (
          <Typography
            noWrap
            variant="caption"
            sx={{
              boxSizing: 'border-box',
              lineHeight: '16px',
              px: 5,
              textAlign: 'center',
              width: '100%',
            }}
          >
            {areaDesc}
          </Typography>
        )}
      </Stack>
    );
  }
}
