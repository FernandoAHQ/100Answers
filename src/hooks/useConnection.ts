import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { GameConfigType } from "../pages/host/GameConfig";

export function useConnection() {
  const { emit, on, socket } = useSocket("http://localhost:3000");

  useEffect(() => {
    on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket, on]);

  const requestNewGame = (gameConfig: GameConfigType) => {
    emit("requestNewGame", gameConfig);
  };

  const onGameCreated = (
    callback: (data: { gameId: string; teams: string[] }) => void
  ) => {
    on("gameCreated", (data: { gameId: string; teams: string[] }) => {
      callback(data);
    });
  };

  return {
    requestNewGame,
    onGameCreated,
  };
}
