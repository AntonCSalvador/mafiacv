import { LobbyStore, Lobby } from "../types";

export const lobbyStore: LobbyStore = {
    lobbies: new Map<string, Lobby>()
}