export interface PageIterator<T> {
  hasNext(): boolean;
  next(): T;
}
