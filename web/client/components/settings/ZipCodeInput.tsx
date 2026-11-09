import React from 'react';

import { Stack, TextField, Typography } from '@mui/material';

import { WeatherStore } from '../../store/WeatherStore';

interface Props {
  store: WeatherStore;
  zipCode: string | null;
  handleChange: (zip: string | null) => void;
}
interface State {
  zipCodeInput: string;
}

export default class ZipCodeInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { zipCode } = props;

    this.state = {
      zipCodeInput: zipCode ?? '',
    };
  }

  override render() {
    const { zipCodeInput } = this.state;

    return (
      <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
        <Typography>Zip Code</Typography>
        <TextField
          autoComplete="off"
          size="small"
          value={zipCodeInput}
          slotProps={{
            htmlInput: {
              inputMode: 'numeric',
              maxLength: 5,
              pattern: '[0-9]*',
            },
          }}
          onBlur={this.validateZipCode}
          onChange={(event) =>
            this.setState({ zipCodeInput: event.target.value })
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              this.validateZipCode();
            }
          }}
        />
      </Stack>
    );
  }

  private validateZipCode = () => {
    const { zipCode, handleChange } = this.props;
    const { zipCodeInput } = this.state;

    if (/^\d{5}$/.test(zipCodeInput)) {
      handleChange(zipCodeInput);

      return;
    }

    handleChange(zipCode);
  };
}
