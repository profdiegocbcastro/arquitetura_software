import { Song } from "../types/song";

export interface SongIterator {
  hasNext(): boolean;
  next(): Song;
}
