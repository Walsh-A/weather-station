import React from 'react';

import { Stack, Typography } from '@mui/material';

interface Props {
  label: string;
  value: string | number | undefined;
  unit?: string;
}

export default class WeatherItemRow extends React.Component<Props> {
  override render() {
    const { label, value, unit } = this.props;

    return (
      <Stack direction="row" spacing={1}>
        <Typography>{label}</Typography>
        <Typography>{value}</Typography>
        {unit && <Typography>{unit}</Typography>}
      </Stack>
    );
  }
}
