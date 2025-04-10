import { useEffect } from "react";
import { useSocket } from "../useSocket";
import { Team } from "../../types/teams";

export function usePlayerConnection() {
  const { emit, on, socket } = useSocket("http://localhost:3000");

  useEffect(() => {
    on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket, on]);

  const checkCode = (gameId: string) => {
    emit("checkCode", { gameId });
  };

  const requestJoinGame = (gameId: string, name: string, team: string) => {
    emit("requestJoinGame", { gameId, name, team });
  };

  const onPlayerJoined = (callback: (teams: Map<string, Team>) => void) => {
    on("playerJoined", ({ teams }: { teams: Map<string, Team> }) => {
      callback(teams);
    });
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
    callback: (data: { isAccepted: boolean; teams: Map<string, Team> }) => void
  ) => {
    on(
      "joinedGame",
      (data: { isAccepted: boolean; teams: Map<string, Team> }) => {
        callback(data);
      }
    );
  };

  return {
    checkCode,
    requestJoinGame,
    onCodeChecked,
    onGameJoined,
    onPlayerJoined,
  };
}
