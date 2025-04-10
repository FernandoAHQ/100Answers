import { useState } from "react";
import { PlayStageType } from "../../types/Play.types";
import styles from "./Play.module.css";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function JoinGame({
  checkCode,
  requestJoin,
  stage,
  setStage,
  gameId,
  availableTeams,
}: {
  checkCode: (gameId: string) => void;
  requestJoin: (gameId: string, name: string, team: string) => void;
  stage: PlayStageType;
  setStage: (nextStage: PlayStageType) => void;
  gameId: string | null;
  availableTeams: string[] | null;
}) {
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [teamSelected, setTeam] = useState<string>("");

  if (availableTeams?.length == 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="mb-5">Teams are complete</h1>
        <Link to="/">
          <button className={`${styles.btn}, ${styles.btnBack}`}>
            Main Menu
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="mb-10 text-center font-bold">
        {stage === "CODE"
          ? "Enter a Game Code"
          : stage === "NAME"
          ? "What's your name?"
          : ""}
      </h1>
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
        {stage === "NAME" && (
          <>
            <input
              type="text"
              id="name"
              className="border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-center rounded p-2 mb-4 text-white text-2xl font-extrabold tracking-widest"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {availableTeams && (
              <>
                <h1
                  className={`mb-5 mt-10 text-center font-bold ${styles.teamHeader}`}
                >
                  Choose a Team
                </h1>
                <div className="flex flex-wrap flex-row items-stretch w-full mb-10">
                  {availableTeams &&
                    availableTeams.map((team) => {
                      return (
                        <button
                          key={team}
                          className={`${styles.teamButton} ${
                            teamSelected === team && styles.teamButtonSelected
                          }`}
                          onClick={() => {
                            setTeam(team);
                          }}
                        >
                          {team}
                        </button>
                      );
                    })}
                </div>
              </>
            )}
          </>
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
              switch (stage) {
                case "CODE":
                  if (code.length < 6) {
                    alert("Please enter a valid game code.");
                    return;
                  }
                  checkCode(code);

                  break;
                case "NAME":
                  if (name.length < 1) {
                    alert("Please enter a valid name.");
                    return;
                  }
                  if (teamSelected === "") {
                    alert("Please select a team.");
                    return;
                  }
                  requestJoin(gameId!, name, teamSelected);
                  break;
              }
              setStage("LOADING");
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
