import React from 'react';

import { Divider } from '@mui/material';

import Weather from './pages/weather/Weather';
import WeatherAlert from './pages/weather/WeatherAlerts';
import News from './pages/news/News';

interface Props {}
interface State {}

export default class App extends React.Component<Props, State> {
  constructor(props: object) {
    super(props);

    this.state = {};
  }

  override componentDidMount() {}

  override render() {
    return (
      <main>
        <h1>Home Station</h1>
        <WeatherAlert />
        <Weather />
        <Divider />
        <News />
      </main>
    );
  }
}
