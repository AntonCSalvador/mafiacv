import { GameState, IGamePhase } from "./types";

export class NightPhase implements IGamePhase {
  run(currState: GameState): GameState {
    return currState;
  }
}
