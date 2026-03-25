import { PlaylistIterator } from "../iterators/playlist-iterator";
import { SongIterator } from "../iterators/song-iterator";
import { Song } from "../types/song";

export class MusicPlaylist {
  constructor(private readonly songs: Song[]) {}

  createIterator(): SongIterator {
    return new PlaylistIterator(this.songs);
  }
}
