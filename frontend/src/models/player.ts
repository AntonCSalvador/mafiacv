export interface Player {
  socketID: string;
  name: string;
  isAlive: boolean;
}

export const createPlayer = (socketID: string, name: string): Player => {
  return {
    socketID,
    name,
    isAlive: true,
  };
};
