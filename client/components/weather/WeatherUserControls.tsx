import React from 'react';

import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TemperatureUnit } from '../../../shared/weather/weather';

interface Props {
  tempUnit: TemperatureUnit;
  handleTempUnitChange: (unit: TemperatureUnit) => void;
}

export default class WeatherUserControls extends React.Component<Props> {
  override componentDidMount() {}

  override render() {
    return <Stack>{this.renderTempUnitToggle()}</Stack>;
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
}
