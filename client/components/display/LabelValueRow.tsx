import React from 'react';

import { Stack, Typography } from '@mui/material';

interface Props {
  label: string;
  value: string | number | null;
}
interface State {}

export default class LabelValueRow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override render() {
    const { label, value } = this.props;

    return (
      <Stack direction="row" spacing={1}>
        <Typography style={{ opacity: 0.5 }}>{label}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    );
  }
}
