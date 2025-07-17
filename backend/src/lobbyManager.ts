import { error } from "console";
import { Lobby, Player, LobbyStore } from "./types"

function getLobby(lobbyStore: LobbyStore, id: string) {
    return lobbyStore.lobbies.get(id)
}

function createLobby(lobbyStore: LobbyStore, host: Player) {
    // TODO: Check if lobby exists
    const newId = Math.random().toString(36).substring(2, 8);

    if (getLobby(lobbyStore, newId)) {
        throw error("Lobby already exists")
    }

    const newLobby: Lobby = {
        id: newId,
        host: host,
        players: [],
    }

    lobbyStore.lobbies.set(newId, newLobby)
    return newId
}

function removeLobby(lobbyStore: LobbyStore, id: string) {
    return lobbyStore.lobbies.delete(id);
}

function listLobbies(lobbyStore: LobbyStore) {
    const lobbies: Map<string, Lobby> = lobbyStore.lobbies;

    for (const [key, value] of lobbies) {
        const host = value.host.name;
        console.log(`Lobby Id: ${key}, Host: ${host}`)
    }
}

export { getLobby, createLobby, removeLobby, listLobbies, LobbyStore }


