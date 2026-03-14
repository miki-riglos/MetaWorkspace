/**
 * A generic registry class for managing a collection of items identified by string keys.
 */
export class Registry<T> {
  protected items: Map<string, T> = new Map();

  /**
   * Registers an item with a specific key.
   * @param key The unique identifier for the item.
   * @param item The item to register.
   */
  register(key: string, item: T): void {
    this.items.set(key, item);
  }

  /**
   * Retrieves an item by its key.
   * @param key The key of the item to retrieve.
   * @returns The item if found, otherwise undefined.
   */
  get(key: string): T | undefined {
    return this.items.get(key);
  }

  /**
   * Checks if an item is registered with the given key.
   * @param key The key to check.
   * @returns True if the key exists, false otherwise.
   */
  has(key: string): boolean {
    return this.items.has(key);
  }

  /**
   * Returns all registered items as an array.
   */
  getAll(): T[] {
    return Array.from(this.items.values());
  }

  /**
   * Returns all registered keys as an array.
   */
  getKeys(): string[] {
    return Array.from(this.items.keys());
  }

  /**
   * Removes an item from the registry.
   * @param key The key of the item to remove.
   * @returns True if an element in the Map object existed and has been removed, or false if the element does not exist.
   */
  unregister(key: string): boolean {
    return this.items.delete(key);
  }

  /**
   * Clears all items from the registry.
   */
  clear(): void {
    this.items.clear();
  }
}
