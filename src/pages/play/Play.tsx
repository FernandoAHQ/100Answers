import React, { useEffect, useState } from "react";
import { useConnection } from "../../hooks/useConnection";
import JoinGame from "./JoinGame";
import { PlayStageType } from "../../types/Play.types";
import Loading from "../Loading";

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

  const gameJoined = (data: { isAccepted: boolean; message: string }) => {
    setTimeout(() => {
      if (data.isAccepted) {
        setStage("WAITING");
      } else {
        alert(data.message);
      }
    }, 1500);
  };

  const [stage, setStage] = useState<PlayStageType>("CODE");
  const [gameId, setGameId] = useState<string | null>(null);
  const [availableTeams, setAvailableTeams] = useState<string[] | null>(null);

  const { checkCode, onCodeChecked, requestJoinGame, onGameJoined } =
    useConnection();

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

    onGameJoined((data: { isAccepted: boolean; message: string }) => {
      gameJoined(data);
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
    </>
  );
}

export default Play;
