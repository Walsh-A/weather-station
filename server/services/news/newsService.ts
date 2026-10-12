import Parser from 'rss-parser';

import { NewsArticle } from '../../../shared/news/news';

const parser = new Parser();

export async function getLocalNews(): Promise<NewsArticle[]> {
  const feed = await parser.parseURL('https://www.nbc4i.com/feed/');

  return feed.items
    .map((item) => {
      const article = new NewsArticle();

      article.title = item.title ?? '';
      article.url = item.link ?? '';
      article.source = 'NBC4';
      article.publishedAt = item.isoDate ?? item.pubDate ?? '';
      article.summary = item.contentSnippet ?? '';
      article.imageUrl = item.enclosure?.url ?? '';

      return article;
    })
    .sort((a, b) => {
      const aPublishedAt = Date.parse(a.publishedAt);
      const bPublishedAt = Date.parse(b.publishedAt);

      return (
        (Number.isNaN(bPublishedAt) ? 0 : bPublishedAt) -
        (Number.isNaN(aPublishedAt) ? 0 : aPublishedAt)
      );
    })
    .slice(0, 25); // Limit to 25 articles
}
