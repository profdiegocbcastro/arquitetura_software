import { MediaPlayer } from "../contexts/media-player";
import { MediaPlayerState } from "./media-player-state";
import { PlayingState } from "./playing-state";

export class StoppedState implements MediaPlayerState {
  pressPlay(player: MediaPlayer): void {
    console.log("[StoppedState] Iniciando reproducao.");
    player.setState(new PlayingState());
  }

  pressPause(_: MediaPlayer): void {
    console.log("[StoppedState] Nao e possivel pausar algo parado.");
  }

  pressStop(_: MediaPlayer): void {
    console.log("[StoppedState] O player ja esta parado.");
  }
}
