import React from 'react';

import { CurrentWeather } from '../../../shared/weather';

interface Props {
  currentWeather: CurrentWeather;
  compassSize: number;
}

export default class WindVane extends React.Component<Props> {
  override render() {
    const { currentWeather: cw, compassSize } = this.props;
    const direction = cw.wind_direction_10m;

    return (
      <svg
        aria-label={`Wind direction ${direction} degrees`}
        role="img"
        viewBox="0 0 64 64"
        width={compassSize}
        height={compassSize}
      >
        <text
          x="32"
          y="10"
          fill="currentColor"
          fontSize="9"
          fontWeight="700"
          textAnchor="middle"
        >
          N
        </text>
        <circle
          cx="32"
          cy="36"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeDasharray="3 3"
          strokeOpacity="0.3"
        />
        <g transform={`rotate(${direction} 32 36)`}>
          <line
            x1="32"
            y1="36"
            x2="32"
            y2="16"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path d="M 27.5 22 L 32 16 L 36.5 22" fill="currentColor" />
          <circle cx="32" cy="36" r="3" fill="currentColor" />
        </g>
      </svg>
    );
  }
}
