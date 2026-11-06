import React from 'react';

import { Typography } from '@mui/material';
import { WeatherStore } from '../../../store/WeatherStore';
import { Conversions } from '../../../../shared/utilityConversions';

interface Props {
  store: WeatherStore;
  high: number | undefined;
  low: number | undefined;
}

export default class HighLowDisplay extends React.Component<Props> {
  override render() {
    const { store, high, low } = this.props;
    const { degreeSymbol, tempUnit } = store;

    const h = Conversions.convertTempUnit(Number(high), tempUnit, 0);
    const l = Conversions.convertTempUnit(Number(low), tempUnit, 0);

    return (
      <Typography>{`${h}${degreeSymbol} / ${l}${degreeSymbol}`}</Typography>
    );
  }
}
