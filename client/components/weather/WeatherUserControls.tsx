import React from 'react';

import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import {
  PrecipitationUnit,
  SpeedUnit,
  TemperatureUnit,
} from '../../../shared/weather/weather';

interface Props {
  tempUnit: TemperatureUnit;
  speedUnit: SpeedUnit;
  precipitationUnit: PrecipitationUnit;
  handleTempUnitChange: (unit: TemperatureUnit) => void;
  handleSpeedUnitChange: (unit: SpeedUnit) => void;
  handlePrecipitationUnit: (unit: PrecipitationUnit) => void;
}

export default class WeatherUserControls extends React.Component<Props> {
  override componentDidMount() {}

  override render() {
    return (
      <Stack>
        {this.renderTempUnitToggle()}
        {this.renderSpeedUnitToggle()}
        {this.renderPrecipitationToggle()}
      </Stack>
    );
  }

  private renderTempUnitToggle() {
    const { tempUnit, handleTempUnitChange } = this.props;

    const items = [];

    for (let unit of Object.values(TemperatureUnit)) {
      items.push(
        <ToggleButton key={unit} value={unit}>
          {unit}
        </ToggleButton>,
      );
    }

    return (
      <ToggleButtonGroup
        exclusive
        value={tempUnit}
        onChange={(_event, value: TemperatureUnit | null) => {
          if (value !== null) {
            handleTempUnitChange(value);
          }
        }}
      >
        {items}
      </ToggleButtonGroup>
    );
  }

  private renderSpeedUnitToggle() {
    const { speedUnit, handleSpeedUnitChange } = this.props;

    const items = [];

    for (let unit of Object.values(SpeedUnit)) {
      items.push(
        <ToggleButton key={unit} value={unit}>
          {unit}
        </ToggleButton>,
      );
    }

    return (
      <ToggleButtonGroup
        exclusive
        value={speedUnit}
        onChange={(_event, value: SpeedUnit | null) => {
          if (value !== null) {
            handleSpeedUnitChange(value);
          }
        }}
      >
        {items}
      </ToggleButtonGroup>
    );
  }

  private renderPrecipitationToggle() {
    const { precipitationUnit, handlePrecipitationUnit } = this.props;

    const items = [];

    for (let unit of Object.values(PrecipitationUnit)) {
      items.push(
        <ToggleButton key={unit} value={unit}>
          {unit}
        </ToggleButton>,
      );
    }

    return (
      <ToggleButtonGroup
        exclusive
        value={precipitationUnit}
        onChange={(_event, value: PrecipitationUnit | null) => {
          if (value !== null) {
            handlePrecipitationUnit(value);
          }
        }}
      >
        {items}
      </ToggleButtonGroup>
    );
  }
}
