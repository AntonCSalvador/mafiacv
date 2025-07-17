export interface Player {
  id: string;
  name: string;
  isAlive: boolean;
  // role: string;
}

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
