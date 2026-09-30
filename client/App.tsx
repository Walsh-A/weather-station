import React from 'react';
import Weather from './pages/Weather';

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
        <Weather />
      </main>
    );
  }
}
