import { useEffect } from "react";
import { useSocket } from "../useSocket";
import { Team } from "../../types/teams";
import { GameState } from "../../types/Play.types";

export function useMonitorConnection() {
  const { emit, on, socket } = useSocket("http://localhost:3000");

  useEffect(() => {
    on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket, on]);

  const requestJoinMonitor = (gameId: string) => {
    emit("requestJoinMonitor", { gameId });
  };

  const onPlayerJoined = (callback: (teams: Map<string, Team>) => void) => {
    on("playerJoined", ({ teams }: { teams: Map<string, Team> }) => {
      callback(teams);
    });
  };

  const onMonitorJoined = (
    callback: (data: { isAccepted: boolean; gameState: GameState }) => void
  ) => {
    on(
      "joinedMonitor",
      (data: { isAccepted: boolean; gameState: GameState }) => {
        callback(data);
      }
    );
  };

  const onGameStarted = (callback: () => void) => {
    on("gameStarted", (payload: unknown) => {
      console.log("Game started");
      console.log(payload);

      callback();
    });
  };

  return {
    requestJoinMonitor,
    onMonitorJoined,
    onPlayerJoined,
    onGameStarted,
  };
}
