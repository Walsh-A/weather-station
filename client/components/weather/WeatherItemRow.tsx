import React from 'react';

import { Stack, Typography } from '@mui/material';

interface Props {
  label: string;
  value: string | number | undefined;
  unit?: string;
  icon?: any;
}

export default class WeatherItemRow extends React.Component<Props> {
  override render() {
    const { label, value, unit, icon } = this.props;

    return (
      <Stack direction="row" spacing={1}>
        <Typography>{label}</Typography>
        <Stack direction="row" spacing={1}>
          <Typography>{value}</Typography>
          {icon}
        </Stack>
        {unit && <Typography>{unit}</Typography>}
      </Stack>
    );
  }
}
