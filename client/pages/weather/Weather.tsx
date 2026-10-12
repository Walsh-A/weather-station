import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import { CurrentWeather, HourlyWeather } from '../../../shared/weather/weather';
import WeatherTemperatures from '../../components/weather/WeatherTemperatures';
import WeatherWinds from '../../components/weather/WeatherWinds';
import WeatherPrecipitation from '../../components/weather/WeatherPrecipitation';
import WeatherCode from '../../components/weather/WeatherCode';
import { WeatherStore } from '../../store/weatherStore';
import { WeeatherEvents } from '../../store/Events';

interface Props {
  store: WeatherStore;
}
interface State {}

export default class Weather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override componentDidMount() {
    const { store } = this.props;
    store.loadWeather();

    store.addEventListener(WeeatherEvents.WeatherUpdate, this.update);
    store.addEventListener(WeeatherEvents.WeatherSettings, this.update);
  }

  override componentWillUnmount() {
    const { store } = this.props;
    store.removeEventListener(WeeatherEvents.WeatherUpdate, this.update);
    store.removeEventListener(WeeatherEvents.WeatherSettings, this.update);
  }

  private update = () => {
    this.forceUpdate();
  };

  override render() {
    const { store } = this.props;
    const { weather, tempUnit, speedUnit, precipitationUnit } = store;

    const cw: CurrentWeather = weather?.current;
    const hw: HourlyWeather = weather?.hourly;

    return (
      <Stack>
        <Stack direction="row">
          <Typography>Current Weather</Typography>
          <Divider orientation="vertical" style={{ width: 4 }} />
        </Stack>
        <Divider />
        <WeatherTemperatures currentWeather={cw} temperatureUnit={tempUnit} />
        <WeatherWinds currentWeather={cw} speedUnit={speedUnit} />
        <WeatherPrecipitation
          currentWeather={cw}
          hourlyWeather={hw}
          precipitationUnit={precipitationUnit}
        />
        <WeatherCode currentWeather={cw} />
        {this.renderLastUpdated(cw)}
      </Stack>
    );
  }

  private renderLastUpdated(cw: CurrentWeather) {
    if (!cw?.time) return null;

    const updatedDate = new Date(cw.time);

    return (
      <Stack direction="row" spacing={1}>
        <Typography>updated</Typography>
        <Stack direction="row" spacing={1}>
          <Typography>{updatedDate.toLocaleDateString()}</Typography>
          <Typography>{updatedDate.toLocaleTimeString()}</Typography>
        </Stack>
      </Stack>
    );
  }
}
