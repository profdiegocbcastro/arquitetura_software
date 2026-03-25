import { MusicPlaylist } from "../aggregates/music-playlist";

export class PlaylistPlayerService {
  play(playlist: MusicPlaylist): void {
    const iterator = playlist.createIterator();

    while (iterator.hasNext()) {
      const song = iterator.next();
      console.log(`[PlaylistPlayerService] Tocando ${song.title} - ${song.artist}`);
    }
  }
}
