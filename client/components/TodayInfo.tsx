import React from 'react';

import { Stack, Typography } from '@mui/material';

interface Props {}
interface State {}

export default class TodayInfo extends React.Component<Props, State> {
  constructor(props: object) {
    super(props);

    this.state = {};
  }

  override render() {
    const now = new Date();

    const dateString = now.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const timeString = now.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      // TODO: this should be in configurable in the settings page
      // TODO: this component (not everything else) needs to update the time every minute
      //   hour12: false,
    });

    return (
      <Stack
        direction="row"
        spacing={1}
        style={
          {
            //   borderBottom: '1px solid #000',
            //   borderRight: '1px solid #000',
            //   borderRadius: '4px',
            //   width: '285px',
          }
        }
      >
        <Typography>{dateString}</Typography>
        <Typography>{timeString}</Typography>
      </Stack>
    );
  }
}
