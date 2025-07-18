import { NightPhase } from "./nightPhase";
import { GameConfiguration, GameState, IGamerManager } from "./types";

export class GameManager implements IGamerManager {
  private gameState: GameState;

  // Constructor creates the initial game state
  constructor(gameConfig: GameConfiguration) {
    const newGameState: GameState = {
      id: gameConfig.id,
      host: gameConfig.host,
      players: gameConfig.players,
      mafiaAlive: 0,
      phase: new NightPhase(),
    };

    this.gameState = newGameState;
  }

  start(): void {}

  end(): void {}

  checkWinCondition(): void {}

  assignRoles(): void {}

  updateState(newState: GameState): void {}
}
