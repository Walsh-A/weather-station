import { NewsArticle } from '../../shared/news/news';
import { BaseStore } from './baseStore';
import { NewsEvents } from './Events';

export class NewsStore extends BaseStore {
  private _articles: NewsArticle[] = [];
  private _numberOfArticles: number = 10;

  async loadNews() {
    try {
      const response = await fetch('/api/news');

      if (!response.ok) {
        throw new Error('Failed to retrieve local news.');
      }

      const data: NewsArticle[] = await response.json();

      this.articles = data;
    } catch (err) {
      console.log(
        'ERROR',
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    }
  }

  get articles(): NewsArticle[] {
    return this._articles;
  }
  set articles(value: NewsArticle[]) {
    this._articles = value;
    this.callEmit(NewsEvents.NewsUpdate);
  }

  get numberOfArticles(): number {
    return this._numberOfArticles;
  }
  set numberOfArticles(value: number) {
    const min = 1;
    const max = 25;

    if (value >= min && value <= max) {
      this._numberOfArticles = value;
      this.callEmit(NewsEvents.NewsSettings);
    }
  }
}

export const newsStore = new NewsStore();
