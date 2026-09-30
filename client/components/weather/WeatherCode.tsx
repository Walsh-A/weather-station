import React from 'react';

import { CurrentWeather } from '../../../shared/weather/weather';
import { WeatherTools } from '../../../shared/weather/weatherTools';
import WeatherItemRow from './WeatherItemRow';
import {
  AcUnit,
  Cloud,
  CloudySnowing,
  Foggy,
  Grain,
  SevereCold,
  Storm,
  Sunny,
  Thunderstorm,
  WaterDrop,
  WbCloudy,
  WbSunny,
} from '@mui/icons-material';

interface Props {
  currentWeather: CurrentWeather;
}

export default class WeatherCode extends React.Component<Props> {
  override render() {
    const { currentWeather: cw } = this.props;

    return (
      <WeatherItemRow
        label="Weather Code:"
        value={`${cw.weather_code} - ${WeatherTools.getWeatherDescription(cw.weather_code)}`}
        icon={this.renderCodeIcon()}
      />
    );
  }

  private renderCodeIcon() {
    const { currentWeather: cw } = this.props;

    switch (cw.weather_code) {
      case 0:
        return <Sunny />;
      case 1:
        return <WbSunny />;
      case 2:
        return <WbCloudy />;
      case 3:
        return <Cloud />;

      case 45:
      case 48:
        return <Foggy />;

      case 51:
      case 53:
        return <Grain />;
      case 55:
        return <WaterDrop />;
      case 56:
      case 57:
        return <SevereCold />;

      case 61:
      case 63:
        return <WaterDrop />;
      case 65:
        return <Storm />;
      case 66:
      case 67:
        return <SevereCold />;

      case 71:
        return <AcUnit />;
      case 73:
      case 75:
        return <CloudySnowing />;
      case 77:
        return <AcUnit />;

      case 80:
      case 81:
        return <WaterDrop />;
      case 82:
        return <Storm />;

      case 85:
      case 86:
        return <CloudySnowing />;

      case 95:
      case 96:
      case 99:
        return <Thunderstorm />;
      default:
        return null;
    }
  }
}
