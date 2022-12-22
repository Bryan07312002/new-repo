class LocalStorage<T> {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  public setItem(key: string, value: T): void {
    const is_string = typeof (value) == 'string';

    let string: string;
    if (is_string) {
      string = value;
    } else {
      string = JSON.stringify(value, [...Object.keys(value)]);
    }

    this.storage.setItem(key, string);
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

export default LocalStorage;
