import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import { NewsStore } from '../../store/newsStore';

interface Props {
  store: NewsStore;
}
interface State {}

export default class News extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  override componentDidMount() {
    const { store } = this.props;
    store.loadNews();

    store.addEventListener('NewsUpdate', this.update);
  }

  override componentWillUnmount() {
    const { store } = this.props;
    store.removeEventListener('NewsUpdate', this.update);
  }

  private update = () => {
    this.forceUpdate();
  };

  override render() {
    const { store } = this.props;
    const { articles, numberOfArticles } = store;

    const limitedArticles = articles.slice(0, numberOfArticles);

    // todo ideas:
    // make title clickable to go to the article
    // show the image with the article?

    return (
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
          <Typography variant="h6">Local News</Typography>
          <Typography>displaying {numberOfArticles} article/s</Typography>
        </Stack>
        <Divider />
        {limitedArticles.map((article) => (
          <Stack key={article.url}>
            <Typography variant="h6">{article.title}</Typography>
            <Typography>{article.summary}</Typography>
          </Stack>
        ))}
      </Stack>
    );
  }
}
