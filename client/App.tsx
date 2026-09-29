import React from 'react';

export default class App extends React.Component<
  Record<string, never>,
  Record<string, never>
> {
  override render() {
    return (
      <main className="app">
        <h1>Hello world</h1>
      </main>
    );
  }
}
