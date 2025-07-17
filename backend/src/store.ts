import { LobbyStore } from "./lobbyStore";
import { Lobby } from "./types";

export default new LobbyStore(new Map<string, Lobby>());
