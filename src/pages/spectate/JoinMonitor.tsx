import { useState } from "react";
import styles from "../play/Play.module.css";
import { Link } from "react-router-dom";
import { PlayStage } from "../../types/Play.types";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function JoinGame({
  requestJoin,
  stage,
  setStage,
  gameId,
}: {
  requestJoin: (gameId: string) => void;
  stage: PlayStage;
  setStage: (nextStage: PlayStage) => void;
  gameId: string | null;
}) {
  const [code, setCode] = useState<string>("");

  console.log(gameId);

  return (
    <div className="">
      <h1 className="mb-10 text-center font-bold">Enter a Game Code</h1>
      <div className="flex flex-col items-center">
        {stage === "CODE" && (
          <input
            type="text"
            id="gameId"
            className="border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-center rounded p-2 mb-4 text-white text-2xl font-extrabold tracking-widest"
            placeholder="Game Code"
            value={code}
            maxLength={6}
            onChange={(e) => {
              console.log(Number(e.target.value));

              if (isNaN(Number(e.target.value)) || e.target.value.includes("."))
                return;
              setCode(e.target.value);
            }}
          />
        )}

        <div className="flex justify-between mt-5 w-full">
          <Link to="/">
            <button className={`${styles.btn}, ${styles.btnBack}`}>
              <FaArrowLeft></FaArrowLeft>
            </button>
          </Link>

          <button
            className={`${styles.btn}, ${styles.btnGo}`}
            onClick={() => {
              if (code.length < 6)
                return alert("Please enter a valid game code.");

              requestJoin(code);

              setStage(PlayStage.LOADING);
            }}
          >
            <FaArrowRight></FaArrowRight>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinGame;
