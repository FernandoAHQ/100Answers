import { useEffect, useState } from "react";

import JoinGame from "./JoinGame";
import Loading from "../Loading";
import Lobby from "./Lobby";

import { PlayStage } from "../../types/Play.types";
import { Team } from "../../types/teams";

import { deserializeTeams } from "../../utils/serialize";

import { usePlayerConnection } from "../../hooks/connections/usePlayerConnection";

function Play() {
  const codeChecked = (data: {
    isValid: boolean;
    availableTeams: string[] | null;
    gameId: string;
  }) => {
    if (data.isValid) {
      console.log(data.availableTeams);
      setAvailableTeams(data.availableTeams);
      setTimeout(() => {
        setGameId(data.gameId);
        setStage(PlayStage.NAME);
      }, 500);
    } else {
      setStage(PlayStage.CODE);
    }
  };

  const gameJoined = ({
    isAccepted,
    teams,
  }: {
    isAccepted: boolean;
    teams: Map<string, Team>;
  }) => {
    setTimeout(() => {
      if (isAccepted) {
        setTeams(deserializeTeams(teams));
        setStage(PlayStage.WAITING);
      } else {
        alert("Error");
      }
    }, 1000);
  };

  const [stage, setStage] = useState<PlayStage>(PlayStage.CODE);
  const [gameId, setGameId] = useState<string | null>(null);
  const [availableTeams, setAvailableTeams] = useState<string[] | null>(null);
  const [teams, setTeams] = useState<Map<string, Team>>(
    new Map<string, Team>()
  );

  const {
    checkCode,
    onCodeChecked,
    requestJoinGame,
    onGameJoined,
    onPlayerJoined,
  } = usePlayerConnection();

  useEffect(() => {
    onCodeChecked(
      (data: {
        isValid: boolean;
        availableTeams: string[] | null;
        gameId: string;
      }) => {
        codeChecked(data);
      }
    );

    onGameJoined((data: { isAccepted: boolean; teams: Map<string, Team> }) => {
      gameJoined(data);
    });

    onPlayerJoined((teams: Map<string, Team>) => {
      setTeams(deserializeTeams(teams));
      console.log("Player joined");
    });
  }, [gameId, setTeams, teams, onCodeChecked, onGameJoined, onPlayerJoined]);

  return (
    <>
      {stage === PlayStage.LOADING && <Loading />}
      {(stage === PlayStage.CODE || stage == PlayStage.NAME) && (
        <JoinGame
          checkCode={checkCode}
          gameId={gameId}
          requestJoin={requestJoinGame}
          stage={stage}
          setStage={setStage}
          availableTeams={availableTeams}
        ></JoinGame>
      )}

      {stage === PlayStage.WAITING && <Lobby teams={teams} />}
    </>
  );
}

export default Play;
