import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import { NewsArticle } from '../../../shared/news/news';

interface Props {}
interface State {
  articles: NewsArticle[];
}

export default class News extends React.Component<Props, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      articles: [],
    };
  }

  override componentDidMount() {
    this.loadNews();
  }

  async loadNews() {
    try {
      const response = await fetch('/api/news');

      if (!response.ok) {
        throw new Error('Failed to retrieve local news.');
      }

      const data: NewsArticle[] = await response.json();

      this.setState({
        articles: data,
      });
    } catch (err) {
      console.log(
        'ERROR',
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    }
  }

  override render() {
    const { articles } = this.state;

    return (
      <Stack spacing={1}>
        <Typography variant="h6">Local News</Typography>
        <Divider />
        {articles.map((article) => (
          <Stack key={article.url}>
            <Typography variant="h6">{article.title}</Typography>
            <Typography>{article.summary}</Typography>
          </Stack>
        ))}
      </Stack>
    );
  }
}
