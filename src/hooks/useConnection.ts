import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { GameConfigType } from "../pages/host/GameConfig";

export function useConnection() {
  const { emit, on, socket } = useSocket("http://localhost:3000");
  useEffect(() => {
    on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket, on, emit]);

  const requestNewGame = (gameConfig: GameConfigType) => {
    emit("requestNewGame", gameConfig);
  };

  return {
    requestNewGame,
  };
}
