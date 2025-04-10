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

  //GAME HOST EVENTS
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

  //GAME PLAYER EVENTS
  const checkCode = (gameId: string) => {
    emit("checkCode", { gameId });
  };

  const requestJoinGame = (gameId: string, name: string) => {
    emit("requestJoinGame", { gameId, name });
  };

  const onCodeChecked = (
    callback: (data: {
      isValid: boolean;
      availableTeams: string[] | null;
      gameId: string;
    }) => void
  ) => {
    on(
      "codeChecked",
      (data: {
        isValid: boolean;
        availableTeams: string[] | null;
        gameId: string;
      }) => {
        callback(data);
      }
    );
  };

  const onGameJoined = (
    callback: (data: { isAccepted: boolean; message: string }) => void
  ) => {
    on("gameJoined", (data: { isAccepted: boolean; message: string }) => {
      callback(data);
    });
  };

  return {
    requestNewGame,
    onGameCreated,
    checkCode,
    requestJoinGame,
    onCodeChecked,
    onGameJoined,
  };
}
