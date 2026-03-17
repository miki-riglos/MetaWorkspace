export class Registry<T> {
  protected _items: Map<string, T> = new Map();

  register(key: string, item: T): void {
    this._items.set(key, item);
  }
  get(key: string): T | undefined {
    return this._items.get(key);
  }

  has(key: string): boolean {
    return this._items.has(key);
  }

  getAll(): T[] {
    return Array.from(this._items.values());
  }

  getKeys(): string[] {
    return Array.from(this._items.keys());
  }

  unregister(key: string): boolean {
    return this._items.delete(key);
  }

  clear(): void {
    this._items.clear();
  }
}
