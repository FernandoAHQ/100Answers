import { useEffect } from "react";
import { useSocket } from "../useSocket";
import { GameConfigType } from "../../pages/host/GameConfig";
import { Team } from "../../types/teams";

export function useGameHostConnection() {
  const { emit, on, socket } = useSocket("http://localhost:3000");

  useEffect(() => {
    on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket, on]);

  const requestNewGame = (gameConfig: GameConfigType) => {
    emit("requestNewGame", gameConfig);
  };

  const startGame = (gameId: string) => {
    emit("startGame", { gameId });
  };

  const onGameCreated = (
    callback: (data: { gameId: string; teams: string[] }) => void
  ) => {
    on("gameCreated", (data: { gameId: string; teams: string[] }) => {
      callback(data);
    });
  };

  const onPlayerJoined = (callback: (teams: Map<string, Team>) => void) => {
    on("playerJoined", ({ teams }: { teams: Map<string, Team> }) => {
      callback(teams);
    });
  };

  const onGameStarted = (callback: () => void) => {
    on("gameStarted", () => {
      callback();
    });
  };

  return {
    requestNewGame,
    startGame,

    onGameCreated,
    onPlayerJoined,
    onGameStarted,
  };
}
