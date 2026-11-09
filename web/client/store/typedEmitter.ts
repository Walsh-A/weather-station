import { WeeatherEvents } from './Events';

export type AppEvent = (typeof WeeatherEvents)[keyof typeof WeeatherEvents];
export type AppEventListener = (event: Event) => void;

export class AppEventEmitter extends EventTarget {
  addListener(event: AppEvent, listener: AppEventListener): this {
    this.addEventListener(event, listener);
    return this;
  }

  removeListener(event: AppEvent, listener: AppEventListener): this {
    this.removeEventListener(event, listener);
    return this;
  }

  emit(event: AppEvent): boolean {
    return this.dispatchEvent(new Event(event));
  }
}
