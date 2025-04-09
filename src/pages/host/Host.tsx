import React, { useEffect, useState } from "react";
import GameConfig from "./GameConfig";
import { useConnection } from "../../hooks/useConnection";
import Waiting from "./Waiting";

type HostStageType = "CONFIG" | "WAITING" | "IN-GAME";

function Host() {
  const [stage, setStage] = useState<HostStageType>("CONFIG");
  const { requestNewGame } = useConnection();
  useEffect(() => {}, []);

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

      {stage === "WAITING" && <Waiting></Waiting>}
      {/* {stage === "WAITING" && <GameConfig></GameConfig>}
      {stage === "IN-GAME" && <GameConfig></GameConfig>} */}
    </>
  );
}

export default Host;
