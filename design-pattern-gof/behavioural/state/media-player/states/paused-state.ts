import { MediaPlayer } from "../contexts/media-player";
import { MediaPlayerState } from "./media-player-state";
import { PlayingState } from "./playing-state";
import { StoppedState } from "./stopped-state";

export class PausedState implements MediaPlayerState {
  pressPlay(player: MediaPlayer): void {
    console.log("[PausedState] Retomando reproducao.");
    player.setState(new PlayingState());
  }

  pressPause(_: MediaPlayer): void {
    console.log("[PausedState] O player ja esta pausado.");
  }

  pressStop(player: MediaPlayer): void {
    console.log("[PausedState] Reproducao interrompida.");
    player.setState(new StoppedState());
  }
}
