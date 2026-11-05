import React from 'react';

import { WeatherTools } from '../../../shared/weatherTools';

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
import type { SvgIconComponent } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { Conversions } from '../../../shared/utilityConversions';

interface Props {
  weatherCode: number;
  visibility?: number;
}

export default class WeatherCode extends React.Component<Props> {
  override render() {
    const { weatherCode } = this.props;
    const CodeIcon = this.getCodeIcon();

    return (
      <Stack sx={{ alignItems: 'center' }}>
        {CodeIcon && <CodeIcon style={{ height: 50, width: 50 }} />}
        <Typography style={{ opacity: 0.7 }}>
          {WeatherTools.getWeatherDescription(weatherCode)}
        </Typography>
        {this.renderVisibility()}
      </Stack>
    );
  }

  //TODO: move this elsehwere
  private renderVisibility() {
    const { visibility } = this.props;

    if (!visibility) return null;

    return (
      <Stack direction="row" spacing={1}>
        <Typography style={{ opacity: 0.5 }}>Visibility</Typography>
        <Typography>{`${Conversions.meterToMile(Number(visibility), 2)} mi`}</Typography>
      </Stack>
    );
  }

  private getCodeIcon(): SvgIconComponent | null {
    const { weatherCode } = this.props;

    switch (weatherCode) {
      case 0:
        return Sunny;
      case 1:
        return WbSunny;
      case 2:
        return WbCloudy;
      case 3:
        return Cloud;

      case 45:
      case 48:
        return Foggy;

      case 51:
      case 53:
        return Grain;
      case 55:
        return WaterDrop;
      case 56:
      case 57:
        return SevereCold;

      case 61:
      case 63:
        return WaterDrop;
      case 65:
        return Storm;
      case 66:
      case 67:
        return SevereCold;

      case 71:
        return AcUnit;
      case 73:
      case 75:
        return CloudySnowing;
      case 77:
        return AcUnit;

      case 80:
      case 81:
        return WaterDrop;
      case 82:
        return Storm;

      case 85:
      case 86:
        return CloudySnowing;

      case 95:
      case 96:
      case 99:
        return Thunderstorm;
      default:
        return null;
    }
  }
}
