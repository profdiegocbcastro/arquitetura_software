import { Song } from "../types/song";
import { SongIterator } from "./song-iterator";

export class PlaylistIterator implements SongIterator {
  private currentIndex = 0;

  constructor(private readonly songs: Song[]) {}

  hasNext(): boolean {
    return this.currentIndex < this.songs.length;
  }

  next(): Song {
    const song = this.songs[this.currentIndex];
    this.currentIndex += 1;
    return song;
  }
}
