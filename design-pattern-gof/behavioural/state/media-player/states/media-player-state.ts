import { MediaPlayer } from "../contexts/media-player";

export interface MediaPlayerState {
  pressPlay(player: MediaPlayer): void;
  pressPause(player: MediaPlayer): void;
  pressStop(player: MediaPlayer): void;
}
