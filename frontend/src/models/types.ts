export interface Player {
  socketID: string;
  name: string;
  isAlive: boolean;
}

export interface Lobby {
  id: string;
  host: Player;
  players: Player[];
}
