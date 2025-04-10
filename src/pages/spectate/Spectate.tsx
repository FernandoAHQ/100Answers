import { useEffect, useState } from "react";

import Loading from "../Loading";

import {
  GameState,
  GameStatus,
  PlayStage,
  RoundMoment,
} from "../../types/Play.types";
import { Team } from "../../types/teams";

import { useMonitorConnection } from "../../hooks/connections/useMonitorConnection";
import JoinMonitor from "./JoinMonitor";
import SpectateLobby from "./SpectateLobby";

function Spectate() {
  const monitorJoined = ({
    isAccepted,
    gameState,
  }: {
    isAccepted: boolean;
    gameState: GameState;
  }) => {
    console.log(isAccepted, gameState);

    setTimeout(() => {
      if (isAccepted) {
        setGameState(gameState);
        setStage(PlayStage.IN_GAME);
      } else {
        alert("Error");
      }
    }, 300);
  };

  const [stage, setStage] = useState<PlayStage>(PlayStage.CODE);
  const [gameState, setGameState] = useState<GameState>({
    id: "",
    state: GameStatus.WAITING_FOR_PLAYERS,
    teamSize: 2,
    totalRounds: 3,
    teams: new Map<string, Team>(),
    currentRound: 1,
    roundMoment: RoundMoment.FACE_OFF, // use whatever default makes sense
    currentTeam: "",
  });
  const [gameId, setGameId] = useState<string | null>(null);

  const { requestJoinMonitor, onMonitorJoined, onPlayerJoined, onGameStarted } =
    useMonitorConnection();

  useEffect(() => {
    onMonitorJoined((data: { isAccepted: boolean; gameState: GameState }) => {
      monitorJoined(data);
    });

    onPlayerJoined((teams: Map<string, Team>) => {
      setGameState({ ...gameState, teams });
    });

    onGameStarted(() => {});
  }, [gameId, onPlayerJoined, onMonitorJoined, onGameStarted, gameState]);

  return (
    <>
      {stage === PlayStage.LOADING && <Loading />}
      {stage === PlayStage.CODE && (
        <JoinMonitor
          requestJoin={requestJoinMonitor}
          stage={stage}
          setStage={setStage}
          gameId={gameId}
        />
      )}

      {stage === PlayStage.IN_GAME && (
        <>
          {gameState?.state === GameStatus.WAITING_FOR_PLAYERS && (
            <SpectateLobby gameId={gameState.id} teams={gameState.teams} />
          )}
        </>
      )}

      {/* {stage === PlayStage.WAITING && <Lobby teams={teams} />} */}
    </>
  );
}

export default Spectate;
