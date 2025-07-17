export interface Player {
    id: string;
    name: string;
    isAlive: boolean;
    // role: string;
  }

export interface Lobby {
    id: string;
    host: Player;
    players: string[];
}

export interface LobbyStore {
    lobbies: Map<string, Lobby>,
}

