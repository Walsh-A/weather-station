export class BaseStore extends EventTarget {
  private readonly _debounceTimeouts = new Map<string, number>();

  callEmit(event: string): void {
    const timeout = this._debounceTimeouts.get(event);
    if (timeout) {
      window.clearTimeout(timeout);
      this._debounceTimeouts.delete(event);
    }

    this._debounceTimeouts.set(
      event,
      window.setTimeout(() => {
        this._debounceTimeouts.delete(event);
        this.dispatchEvent(new Event(event));
      }, 50),
    );
  }
}
