import React, { useEffect, useState } from "react";
import { useConnection } from "../../hooks/useConnection";
import JoinGame from "./JoinGame";
import { PlayStageType } from "../../types/Play.types";
import Loading from "../Loading";
import { Team } from "../../types/teams";
import { deserializeTeams } from "../../utils/serialize";
import Lobby from "./Lobby";

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
        setStage("NAME");
      }, 500);
    } else {
      setStage("CODE");
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
        setStage("WAITING");
      } else {
        alert("Error");
      }
    }, 1500);
  };

  const [stage, setStage] = useState<PlayStageType>("CODE");
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
  } = useConnection();

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
  }, [gameId]);

  return (
    <>
      {stage === "LOADING" && <Loading />}
      {(stage === "CODE" || stage == "NAME") && (
        <JoinGame
          checkCode={checkCode}
          gameId={gameId}
          requestJoin={requestJoinGame}
          stage={stage}
          setStage={setStage}
          availableTeams={availableTeams}
        ></JoinGame>
      )}

      {stage === "WAITING" && <Lobby teams={teams} />}
    </>
  );
}

export default Play;
