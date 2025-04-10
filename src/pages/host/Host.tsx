import React, { useEffect, useState } from "react";
import GameConfig from "./GameConfig";
import Waiting from "./Waiting";
import { Team } from "../../types/teams";
import { deserializeTeams } from "../../utils/serialize";
import { useGameHostConnection } from "../../hooks/connections/useGameHostConnection";
import GameHost from "./GameHost";

type HostStageType = "CONFIG" | "WAITING" | "IN-GAME";

function Host() {
  const [stage, setStage] = useState<HostStageType>("CONFIG");
  const [gameId, setGameId] = useState<string | null>(null);
  const [teams, setTeams] = useState<Map<string, Team>>(
    new Map<string, Team>()
  );

  const {
    requestNewGame,
    onGameCreated,
    onPlayerJoined,
    startGame,
    onGameStarted,
  } = useGameHostConnection();
  useEffect(() => {
    onGameCreated((data: { gameId: string; teams: string[] }) => {
      setTimeout(() => {
        setGameId(data.gameId);
        const newTeams = new Map<string, Team>();
        newTeams.set(data.teams[0], { players: new Set(), points: 0 });
        newTeams.set(data.teams[1], { players: new Set(), points: 0 });
        setTeams(newTeams as Map<string, Team>);
      }, 1500);
    });

    onPlayerJoined((teams: Map<string, Team>) => {
      setTeams(deserializeTeams(teams));
      console.log("Player joined");
    });

    onGameStarted(() => {
      setStage("IN-GAME");
      //setTeams(deserializeTeams(teams));
      //console.log("Player joined");
    });
  }, [gameId, teams, onGameCreated, onPlayerJoined, onGameStarted]);

  return (
    <>
      {stage === "CONFIG" && (
        <GameConfig
          requestGame={requestNewGame}
          next={() => {
            setStage("WAITING");
          }}
        ></GameConfig>
      )}

      {stage === "WAITING" && (
        <Waiting gameId={gameId} teams={teams} startGame={startGame}></Waiting>
      )}

      {stage === "IN-GAME" && <GameHost />}
      {/* {stage === "WAITING" && <GameConfig></GameConfig>}
      {stage === "IN-GAME" && <GameConfig></GameConfig>} */}
    </>
  );
}

export default Host;
