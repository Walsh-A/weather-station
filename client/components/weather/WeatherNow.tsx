import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

// import WeatherTemperatures from '../../components/weather/WeatherTemperatures';
// import WeatherWinds from '../../components/weather/WeatherWinds';
// import WeatherPrecipitation from '../../components/weather/WeatherPrecipitation';
import WeatherCode from '../../components/weather/WeatherCode';
import { WeatherStore } from '../../store/weatherStore';
import WeatherSunriseSunset from '../../components/weather/WeatherSunriseSunset';
import { WeeatherEvents } from '../../store/Events';
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from '../../../shared/weather';
import { Conversions } from '../../../shared/utilityConversions';
import { WeatherTools } from '../../../shared/weatherTools';
import WindVane from './WindVane';

interface Props {
  store: WeatherStore;
  currentWeather: CurrentWeather;
  hourlyWeather: HourlyWeather;
  dailyWeather: DailyWeather;
}
interface State {}

export default class WeatherNow extends React.Component<Props, State> {
  private readonly degreeSymbol = '\u00B0';

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
    // todo: get all weather info that is in a METAR
    const { store, currentWeather: cw, dailyWeather: dw } = this.props;
    const { tempUnit } = store;

    const degreeUnit = `${this.degreeSymbol}${tempUnit}`;

    return (
      <Stack sx={{ margin: 1 }}>
        {/* this is for debugging purposes */}
        {/* {this.renderWeatherDataRows()} */}
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={3}>
            <Stack style={{ alignItems: 'start' }}>
              {this.renderCurrentTemp(degreeUnit)}
              {this.renderTempLine()}
              {this.renderPrecipitationLine()}
            </Stack>
            <Stack spacing={1}>
              <WeatherCode
                weatherCode={cw.weather_code}
                visibility={cw.visibility}
              />
            </Stack>
          </Stack>
          <Stack>{this.renderWindLIne()}</Stack>
        </Stack>
        <WeatherSunriseSunset dailyWeather={dw} sliderWidth={500} />
      </Stack>
    );
  }

  private renderCurrentTemp(degreeUnit: string) {
    const { store, currentWeather: cw } = this.props;
    const { tempUnit } = store;

    return (
      <Typography variant="h3">
        {Conversions.convertTempUnit(cw.temperature_2m, tempUnit, 0)}
        {degreeUnit}
      </Typography>
    );
  }

  private renderTempLine() {
    const { store, currentWeather: cw, dailyWeather: dw } = this.props;
    const { tempUnit } = store;

    return (
      <Stack direction="row" spacing={1}>
        {this.renderDisplayRow(
          'Feels Like',
          Conversions.convertTempUnit(cw.apparent_temperature, tempUnit, 0),
        )}
        <Divider orientation="vertical" style={{ height: 16, width: 4 }} />
        {this.renderDisplayRow(
          'H',
          Conversions.convertTempUnit(
            Number(dw.temperature_2m_max[0]),
            tempUnit,
            0,
          ),
        )}
        <Divider orientation="vertical" style={{ height: 16, width: 4 }} />
        {this.renderDisplayRow(
          'L',
          Conversions.convertTempUnit(
            Number(dw.temperature_2m_min[0]),
            tempUnit,
            0,
          ),
        )}
      </Stack>
    );
  }

  private renderPrecipitationLine() {
    const { currentWeather: cw, hourlyWeather: hw } = this.props;

    const precipitationProb = WeatherTools.getCurrentPrecipitationProbability(
      hw,
      cw,
    );

    return (
      <Stack direction="row" spacing={1}>
        {this.renderDisplayRow('Precipitation', precipitationProb + '%')}
        <Divider orientation="vertical" style={{ height: 16, width: 4 }} />
        {/* //todo: add in rain/snow etc if any exists */}
        {this.renderDisplayRow('Humidity', cw.relative_humidity_2m + '%')}
        <Divider orientation="vertical" style={{ height: 16, width: 4 }} />
        {this.renderDisplayRow(
          'Dew Point',
          `${Conversions.celsiusToFahrenheit(cw.dewpoint_2m)}${this.degreeSymbol}`,
        )}
      </Stack>
    );
  }

  private renderWindLIne() {
    const { store, currentWeather: cw } = this.props;
    const { speedUnit } = store;

    return (
      <Stack style={{ alignItems: 'center' }} spacing={1}>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <WindVane currentWeather={cw} compassSize={60} />
          <Typography>{cw.wind_direction_10m + this.degreeSymbol}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {this.renderDisplayRow(
            'Wind',
            `${Conversions.convertSpeedUnits(cw.wind_speed_10m, speedUnit)}  ${speedUnit}`,
          )}
          <Divider orientation="vertical" style={{ height: 16, width: 4 }} />
          {this.renderDisplayRow(
            'Gusting',
            `${Conversions.convertSpeedUnits(cw.wind_gusts_10m, speedUnit)} ${speedUnit}`,
          )}
        </Stack>
        {this.renderDisplayRow(
          'Pressure',
          `${Conversions.convertPascalToInHg(cw.pressure_msl)} inHg`,
        )}
      </Stack>
    );
  }

  private renderDisplayRow(label: string, value: string | number) {
    // todo make this a reusable component that can be used in other places
    return (
      <Stack direction="row" spacing={1}>
        <Typography style={{ opacity: 0.5 }}>{label}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    );
  }

  //  this is for debugging purposes
  // private renderWeatherDataRows() {
  //   const {
  //     store,
  //     currentWeather: cw,
  //     hourlyWeather: hw,
  //     dailyWeather: dw,
  //   } = this.props;
  //   const { tempUnit, speedUnit, precipitationUnit } = store;

  //   return (
  //     <Stack>
  //       <WeatherTemperatures currentWeather={cw} temperatureUnit={tempUnit} />
  //       <WeatherWinds currentWeather={cw} speedUnit={speedUnit} />
  //       <WeatherPrecipitation
  //         currentWeather={cw}
  //         hourlyWeather={hw}
  //         precipitationUnit={precipitationUnit}
  //       />
  //       <WeatherCode weatherCode={cw.weather_code} dataRow={true} />
  //       <WeatherSunriseSunset dailyWeather={dw} />
  //     </Stack>
  //   );
  // }
}
