import React from 'react';

import { Stack, Typography } from '@mui/material';
import { NewsEvents } from '../../store/Events';
import { NewsStore } from '../../store/newsStore';
import NumberTextfield from '../NumberTextfield';

interface Props {
  store: NewsStore;
}

export default class NewsSettings extends React.Component<Props> {
  override componentDidMount() {
    const { store } = this.props;
    store.addEventListener(NewsEvents.NewsSettings, this.update);
  }

  override componentWillUnmount() {
    const { store } = this.props;
    store.removeEventListener(NewsEvents.NewsSettings, this.update);
  }

  private update = () => {
    this.forceUpdate();
  };

  override render() {
    return <Stack spacing={1}>{this.renderNumberOfArticlesInput()}</Stack>;
  }

  private renderNumberOfArticlesInput() {
    const { store } = this.props;
    const { numberOfArticles } = store;

    return (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography>Number of Articles</Typography>
        <NumberTextfield
          value={numberOfArticles}
          onValid={(value: number) => (store.numberOfArticles = value)}
          validate={(value: number) => value >= 1 && value <= 50}
          correctError={() => numberOfArticles}
        />
      </Stack>
    );
  }
}
