import { MediaPlayerState } from "../states/media-player-state";
import { StoppedState } from "../states/stopped-state";

export class MediaPlayer {
  private state: MediaPlayerState = new StoppedState();

  setState(state: MediaPlayerState): void {
    this.state = state;
  }

  pressPlay(): void {
    this.state.pressPlay(this);
  }

  pressPause(): void {
    this.state.pressPause(this);
  }

  pressStop(): void {
    this.state.pressStop(this);
  }
}
