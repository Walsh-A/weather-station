import React from 'react';

import Weather from './pages/Weather';
import DisplayFrame from './components/weather/DisplayFrame';

interface Props {}
interface State {}

export default class App extends React.Component<Props, State> {
  constructor(props: object) {
    super(props);

    this.state = {};
  }

  // override componentDidMount() {
  //   void weatherStore.loadLocation();
  // }

  override render() {
    return (
      <DisplayFrame>
        <Weather />
      </DisplayFrame>
    );
  }
}
