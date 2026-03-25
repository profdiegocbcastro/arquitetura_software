import { MediaPlayer } from "../contexts/media-player";
import { MediaPlayerState } from "./media-player-state";
import { PausedState } from "./paused-state";
import { StoppedState } from "./stopped-state";

export class PlayingState implements MediaPlayerState {
  pressPlay(_: MediaPlayer): void {
    console.log("[PlayingState] O player ja esta tocando.");
  }

  pressPause(player: MediaPlayer): void {
    console.log("[PlayingState] Reproducao pausada.");
    player.setState(new PausedState());
  }

  pressStop(player: MediaPlayer): void {
    console.log("[PlayingState] Reproducao parada.");
    player.setState(new StoppedState());
  }
}
