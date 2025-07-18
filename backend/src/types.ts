// Players and Roles

export interface Player {
  id: string;
  name: string;
  isAlive: boolean;
  // role: Role[];
}

export interface Role {
  name: string;
}

// Lobby
export interface Lobby {
  id: string;
  host: Player;
  players: Player[];
}

export interface ILobbyManager {
  createLobby(host: Player): Lobby;
  deleteLobby(id: string): void;
  addPlayerToLobby(id: string, player: Player): void;
  removePlayerFromLobby(id: string, player: Player): void;
  getAllLobbies(): Lobby[];
}

export interface ILobbyStore {
  getLobbies(): Lobby[];
  getLobbyById(id: string): Lobby | undefined;
  addLobby(lobby: Lobby): void;
  removeLobby(id: string): void;
  updateLobby(id: Lobby): void;
}

// Game

export interface GameConfiguration {
  id: string;
  host: Player;
  players: Player[];
  theme: string;
  // roles: Role[]
  // timePerNight
}

export interface GameState {
  id: string;
  host: Player;
  players: Player[];
  mafiaAlive: number;
  phase: IGamePhase;
}

export interface IGamerManager {
  start(config: GameConfiguration): void;
  assignRoles(): void;
  end(): void;
  updateState(newState: GameState): void;
  checkWinCondition(): void;
}

export interface IGamePhase {
  run(currState: GameState): GameState;
}

export interface NightPhase {
  action(role: Role): void;
}
