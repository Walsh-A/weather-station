import React from 'react';

import {
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import {
  PrecipitationUnit,
  SpeedUnit,
  TemperatureUnit,
} from '../../../shared/settings';
import { WeatherStore } from '../../store/weatherStore';
import { WeeatherEvents } from '../../store/Events';

interface Props {
  store: WeatherStore;
}

interface State {
  tempUnit: TemperatureUnit;
  speedUnit: SpeedUnit;
  precipitationUnit: PrecipitationUnit;
}

export default class WeatherUserControls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { store } = props;

    this.state = {
      tempUnit: store.tempUnit,
      speedUnit: store.speedUnit,
      precipitationUnit: store.precipitationUnit,
    };
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
    const { store } = this.props;

    this.setState({
      tempUnit: store.tempUnit,
      speedUnit: store.speedUnit,
      precipitationUnit: store.precipitationUnit,
    });
  };

  override render() {
    return (
      <Stack spacing={1} sx={{ alignSelf: 'center', width: 'fit-content' }}>
        {this.renderTempUnitToggle()}
        {this.renderSpeedUnitToggle()}
        {this.renderPrecipitationToggle()}
        {this.renderButtons()}
      </Stack>
    );
  }

  private renderTempUnitToggle() {
    const { tempUnit } = this.state;
    const tempUnits = Object.values(TemperatureUnit);

    return this.renderLabelAndToggleRow(
      'Temperature Unit',
      this.renderToggleButtonGroup(
        tempUnits,
        tempUnit,
        (value: TemperatureUnit) => {
          this.setState({ tempUnit: value });
        },
      ),
    );
  }

  private renderSpeedUnitToggle() {
    const { speedUnit } = this.state;
    const speedUnits = Object.values(SpeedUnit);

    return this.renderLabelAndToggleRow(
      'Speed Unit',
      this.renderToggleButtonGroup(
        speedUnits,
        speedUnit,
        (value: SpeedUnit) => {
          this.setState({ speedUnit: value });
        },
      ),
    );
  }

  private renderPrecipitationToggle() {
    const { precipitationUnit } = this.state;
    const precipitationUnits = Object.values(PrecipitationUnit);

    return this.renderLabelAndToggleRow(
      'Precipitation Unit',
      this.renderToggleButtonGroup(
        precipitationUnits,
        precipitationUnit,
        (value: PrecipitationUnit) => {
          this.setState({ precipitationUnit: value });
        },
      ),
    );
  }

  private renderButtons() {
    const { store } = this.props;
    const { tempUnit, speedUnit, precipitationUnit } = this.state;

    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: 'center', pt: 0.5 }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: 'black',
            color: 'black',
          }}
          onClick={() => (store.settingsOpen = false)}
        >
          Cancel
        </Button>
        <Button
          disableElevation
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
          }}
          onClick={() =>
            void store.saveSettings(tempUnit, speedUnit, precipitationUnit)
          }
        >
          Save
        </Button>
      </Stack>
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
