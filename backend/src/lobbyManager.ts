import { error } from "console";
import { Lobby, Player, ILobbyStore, ILobbyManager } from "./types";
import { LobbyStore } from "./lobbyStore";

export class LobbyManager implements ILobbyManager {
  private lobbyStore: ILobbyStore;

  constructor(lobbyStore: ILobbyStore) {
    this.lobbyStore = lobbyStore;
  }

  createLobby(host: Player): Lobby {
    // TODO: Check if lobby exists
    const newId = Math.random().toString(36).substring(2, 8);

    const newLobby: Lobby = {
      id: newId,
      host: host,
      players: [host],
    };

    this.lobbyStore.addLobby(newLobby);
    return newLobby;
  }

  deleteLobby(id: string): void {
    this.lobbyStore.removeLobby(id);
  }

  addPlayerToLobby(id: string, player: Player): void {
    let lobby: Lobby | undefined = this.lobbyStore.getLobbyById(id);

    if (!lobby) {
      throw error("Lobby not found");
    }

    lobby.players.push(player);
  }

  removePlayerFromLobby(id: string, player: Player): void {
    let lobby = this.lobbyStore.getLobbyById(id);

    if (!lobby) {
      throw error("Lobby not found");
    }

    let players = lobby.players;
    players.filter((p) => p !== player);

    this.lobbyStore.updateLobby(lobby);
  }

  getAllLobbies(): Lobby[] {
    return this.lobbyStore.getLobbies();
  }
}
