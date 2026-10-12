import React from 'react';

import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  PrecipitationUnit,
  SpeedUnit,
  TemperatureUnit,
} from '../../../shared/weather/weather';
import { WeatherStore } from '../../store/weatherStore';
import { WeeatherEvents } from '../../store/Events';

interface Props {
  store: WeatherStore;
}

export default class WeatherUserControls extends React.Component<Props> {
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
    return (
      <Stack spacing={1}>
        {this.renderTempUnitToggle()}
        {this.renderSpeedUnitToggle()}
        {this.renderPrecipitationToggle()}
      </Stack>
    );
  }

  private renderTempUnitToggle() {
    const { store } = this.props;
    const { tempUnit } = store;
    const tempUnits = Object.values(TemperatureUnit);

    return this.renderLabelAndToggleRow(
      'Temperature Unit',
      this.renderToggleButtonGroup(
        tempUnits,
        tempUnit,
        (value: TemperatureUnit) => {
          store.tempUnit = value;
        },
      ),
    );
  }

  private renderSpeedUnitToggle() {
    const { store } = this.props;
    const { speedUnit } = store;
    const speedUnits = Object.values(SpeedUnit);

    return this.renderLabelAndToggleRow(
      'Speed Unit',
      this.renderToggleButtonGroup(
        speedUnits,
        speedUnit,
        (value: SpeedUnit) => {
          store.speedUnit = value;
        },
      ),
    );
  }

  private renderPrecipitationToggle() {
    const { store } = this.props;
    const { precipitationUnit } = store;
    const precipitationUnits = Object.values(PrecipitationUnit);

    return this.renderLabelAndToggleRow(
      'Precipitation Unit',
      this.renderToggleButtonGroup(
        precipitationUnits,
        precipitationUnit,
        (value: PrecipitationUnit) => {
          store.precipitationUnit = value;
        },
      ),
    );
  }

  private renderLabelAndToggleRow(label: string, toggle: React.ReactNode) {
    const labelWidth = 150;

    return (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography style={{ width: labelWidth }}>{label}</Typography>
        {toggle}
      </Stack>
    );
  }

  private renderToggleButtonGroup(
    unitArray: any[],
    selectedUnit: any,
    onChange: (value: any) => void,
  ) {
    const items = [];

    for (let unit of unitArray) {
      items.push(
        <ToggleButton key={unit} value={unit}>
          {unit}
        </ToggleButton>,
      );
    }

    return (
      <ToggleButtonGroup
        exclusive
        size="small"
        value={selectedUnit}
        sx={{
          width: 112,
          height: 32,
          flexShrink: 0,
          '& .MuiToggleButton-root': {
            flex: 1,
            minWidth: 0,
            px: 1,
            py: 0.25,
            lineHeight: 1.2,
          },
        }}
        onChange={(_event, value: any[] | null) => {
          if (value !== null) {
            onChange(value);
          }
        }}
      >
        {items}
      </ToggleButtonGroup>
    );
  }
}
