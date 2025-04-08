import React, { useEffect, useState } from "react";
import GameConfig from "./GameConfig";
import { useSocket } from "../../hooks/useSocket";

type HostStageType = "CONFIG" | "WAITING" | "IN-GAME";

function Host() {
  const [stage] = useState<HostStageType>("CONFIG");
  const { emit, on, socket } = useSocket("http://localhost:3000");
  useEffect(() => {
    on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket, on, emit]);

  return (
    <>
      {stage === "CONFIG" && <GameConfig></GameConfig>}
      {stage === "WAITING" && <GameConfig></GameConfig>}
      {stage === "IN-GAME" && <GameConfig></GameConfig>}
    </>
  );
}

export default Host;
