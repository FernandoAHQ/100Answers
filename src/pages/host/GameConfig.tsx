import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./host.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type FunctionParams = {
  requestGame: (gameConfig: GameConfigType) => void;
  next: () => void;
};

export type GameConfigType = {
  team1: string;
  team2: string;
  teamSize: number;
  randomTeam: boolean;
};

const initialGameConfig: GameConfigType = {
  team1: "",
  team2: "",
  teamSize: 5,
  randomTeam: false,
};

function GameConfig({ requestGame, next }: FunctionParams) {
  const [gameConfig, setGameConfig] =
    useState<GameConfigType>(initialGameConfig);

  return (
    <div className={styles.setupPanel}>
      {/* <Link to="/">HOME</Link> */}
      <h1 className="font-bold mb-10 text-center">New Game</h1>
      <div className="flex flex-wrap">
        <div className="teams  p-1">
          <div className="team1 mb-5">
            <label
              className="block text-orange font-bold"
              htmlFor="inline-full-name"
            >
              Team 1
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              id="inline-full-name"
              type="text"
              value={gameConfig.team1}
              onChange={(e) => {
                setGameConfig({ ...gameConfig, team1: e.target.value });
              }}
              placeholder="Team Name"
            />
          </div>

          <div className="team2 mb-5">
            <label
              className="block text-white font-bold"
              htmlFor="inline-full-name"
            >
              Team 2
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              type="text"
              value={gameConfig.team2}
              onChange={(e) => {
                setGameConfig({ ...gameConfig, team2: e.target.value });
              }}
              placeholder="Team Name"
            />{" "}
          </div>
        </div>

        <div className="teamConfig flex flex-col p-1 mb-5">
          <div className="teamSize mb-5">
            <label className="block text-white font-bold">Team Size</label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              type="number"
              value={gameConfig.teamSize}
              onChange={(e) => {
                setGameConfig({
                  ...gameConfig,
                  teamSize: Number(e.target.value),
                });
              }}
              placeholder="Team Name"
            />{" "}
          </div>

          <div className="randomTeams">
            <label
              className="block text-white font-bold"
              htmlFor="inline-full-name"
            >
              Random Teams
            </label>
            <div className="flex h-full pl-6">
              <input
                className="scale-200"
                type="checkbox"
                onChange={(e) => {
                  setGameConfig({
                    ...gameConfig,
                    randomTeam: e.target.checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-5 w-full">
        <Link to="/">
          <button className={`${styles.btn}, ${styles.btnBack}`}>
            <FaArrowLeft></FaArrowLeft>
          </button>
        </Link>

        <button
          className={`${styles.btn}, ${styles.btnGo}`}
          onClick={() => {
            if (validateData(gameConfig)) {
              requestGame(gameConfig);
              next();
            }
          }}
        >
          <FaArrowRight></FaArrowRight>
        </button>
      </div>
    </div>
  );
}

const validateData = (data: GameConfigType) => {
  if (!data.team1 || !data.team2) {
    alert("Please enter team names.");
    return false;
  }
  if (data.teamSize <= 0) {
    alert("Team size must be greater than 0.");
    return false;
  }
  return true;
};

export default GameConfig;
