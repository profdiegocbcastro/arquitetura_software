import { PlaylistPlayerService } from "./services/playlist-player-service";
import { MusicPlaylist } from "./aggregates/music-playlist";
import { Song } from "./types/song";

const songs: Song[] = [
  { title: "Come Together", artist: "The Beatles" },
  { title: "Everlong", artist: "Foo Fighters" },
  { title: "Tempo Perdido", artist: "Legiao Urbana" },
];

const playlist = new MusicPlaylist(songs);
const playerService = new PlaylistPlayerService();

playerService.play(playlist);
