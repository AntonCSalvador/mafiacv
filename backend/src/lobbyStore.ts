import { ILobbyStore, Lobby } from "./types";

export class LobbyStore implements ILobbyStore {
  private lobbyStore: Map<string, Lobby>;

  constructor(store: Map<string, Lobby>) {
    this.lobbyStore = store;
  }

  getLobbies(): Lobby[] {
    const lobbies = new Array<Lobby>();
    for (const [key, val] of this.lobbyStore) {
      lobbies.push(val);
    }
    return lobbies;
  }

  getLobbyById(id: string): Lobby | undefined {
    return this.lobbyStore.get(id);
  }

  addLobby(lobby: Lobby): void {
    const id = lobby.id;
    this.lobbyStore.set(id, lobby);
  }

  removeLobby(id: string): void {
    this.lobbyStore.delete(id);
  }

  updateLobby(lobby: Lobby): void {
    const id = lobby.id;
    this.lobbyStore.set(id, lobby);
  }
}
