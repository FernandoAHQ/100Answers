import React from "react";
import styles from "./Play.module.css";

function Lobby({ teams }: { teams: Map<string, { players: Set<string> }> }) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-3xl font-bold text-gray-800">Waiting...</h1>
      <h2 className="text-xl font-semibold mt-4">
        Waiting for players to join
      </h2>
      {Array.from(teams, ([name, value]) => ({ name, value })).map((team) => {
        return (
          <div key={team.name} className={styles.teamList}>
            <h2>{team.name}</h2>
            <div className={styles.teamMembers}>
              {Array.from(team.value.players).map((name) => (
                <h3 key={name}>{name}</h3>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Lobby;
