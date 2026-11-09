import React from 'react';

import { Stack } from '@mui/material';

interface Props {
  children: React.ReactNode;
}
interface State {}

export default class DisplayFrame extends React.Component<Props, State> {
  // Static height based on a 7.5" e-ink planned display screen
  readonly height = '480px';
  readonly width = '800px';

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override render() {
    const { children } = this.props;

    return (
      <Stack
        sx={{
          height: this.height,
          width: this.width,
          // TODO: border only for testing purposes, remove for production
          border: '1px solid #000',
        }}
      >
        {children}
      </Stack>
    );
  }
}
