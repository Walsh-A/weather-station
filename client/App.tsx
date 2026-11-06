import React from 'react';

import Weather from './pages/Weather';
import WeatherAlert from './pages/WeatherAlerts';
import DisplayFrame from './components/weather/DisplayFrame';
import TodayInfo from './components/TodayInfo';

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
      <DisplayFrame>
        <WeatherAlert />
        <TodayInfo />
        <Weather />
      </DisplayFrame>
    );
  }
}
