import React, { useEffect, useState } from "react";
import GameConfig from "./GameConfig";
import { useConnection } from "../../hooks/useConnection";
import Waiting from "./Waiting";
import { Team } from "../../types/teams";

type HostStageType = "CONFIG" | "WAITING" | "IN-GAME";

function Host() {
  const [stage, setStage] = useState<HostStageType>("CONFIG");
  const [gameId, setGameId] = useState<string | null>(null);
  const [teams, setTeams] = useState<Map<string, Team>>(
    new Map<string, Team>()
  );

  const { requestNewGame, onGameCreated } = useConnection();
  useEffect(() => {
    onGameCreated((data: { gameId: string; teams: string[] }) => {
      setTimeout(() => {
        setGameId(data.gameId);
        const newTeams = new Map<string, Team>();
        newTeams.set(data.teams[0], { players: new Map(), points: 0 });
        newTeams.set(data.teams[1], { players: new Map(), points: 0 });
        setTeams(newTeams);
      }, 1500);
    });
  }, [onGameCreated, gameId]);

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

      {stage === "WAITING" && <Waiting gameId={gameId} teams={teams}></Waiting>}
      {/* {stage === "WAITING" && <GameConfig></GameConfig>}
      {stage === "IN-GAME" && <GameConfig></GameConfig>} */}
    </>
  );
}

export default Host;
