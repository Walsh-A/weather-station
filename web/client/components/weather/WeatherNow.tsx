import React from 'react';

import { Stack, Typography } from '@mui/material';

import WeatherTemperatures from './temperature/WeatherTemperatures';
import WeatherWinds from '../../components/weather/WeatherWinds';
import WeatherPrecipitation from '../../components/weather/WeatherPrecipitation';
import WeatherCode from '../../components/weather/WeatherCode';
import { WeatherStore } from '../../store/WeatherStore';
import WeatherSunriseSunset from '../../components/weather/WeatherSunriseSunset';
import { WeeatherEvents } from '../../store/Events';
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from '../../../shared/weather';
import { Conversions } from '../../../shared/utilityConversions';
import LabelValueRow from '../display/LabelValueRow';

interface Props {
  store: WeatherStore;
  currentWeather: CurrentWeather;
  hourlyWeather: HourlyWeather;
  dailyWeather: DailyWeather;
}
interface State {}

export default class WeatherNow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override componentDidMount() {
    const { store } = this.props;
    store.addEventListener(WeeatherEvents.WeatherSettings, this.update);
  }

  override componentWillUnmount() {
    const { store } = this.props;
    store.removeEventListener(WeeatherEvents.WeatherSettings, this.update);
  }

  private update = () => {
    this.forceUpdate();
  };

  override render() {
    const { store, currentWeather: cw, dailyWeather: dw } = this.props;

    return (
      <Stack sx={{ margin: 1 }}>
        <Stack direction="row" style={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1}>
            <WeatherCode weatherCode={cw.weather_code} />
            <WeatherTemperatures
              store={store}
              currentWeather={cw}
              dailyWeather={dw}
            />
          </Stack>
          {this.renderMiddleData()}
          <WeatherWinds store={store} currentWeather={cw} />
        </Stack>
        <WeatherSunriseSunset dailyWeather={dw} sliderWidth={400} />
      </Stack>
    );
  }

  private renderMiddleData() {
    const { store, currentWeather: cw, hourlyWeather: hw } = this.props;

    return (
      <Stack sx={{ alignSelf: 'center' }}>
        <LabelValueRow
          label="Visibility"
          value={`${Conversions.meterToMile(Number(cw.visibility), 2)} mi`}
        />
        <LabelValueRow label="Humidity" value={cw.relative_humidity_2m + '%'} />
        <WeatherPrecipitation
          store={store}
          currentWeather={cw}
          hourlyWeather={hw}
        />
      </Stack>
    );
  }
}
