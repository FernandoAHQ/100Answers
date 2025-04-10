import { Team } from "../../types/teams";
import styles from "../host/host.module.css";
function SpectateLobby({
  gameId,
  teams,
}: {
  gameId: string | null;
  teams: Map<string, Team>;
}) {
  console.log(Array.from(teams, ([name, value]) => ({ name, value })));

  console.log(JSON.stringify(teams));

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className={styles.waitingTitle}>
        {gameId ? "Waiting on Players..." : "Creating Game"}
      </h1>
      {gameId && <h2 className={styles.code}>Code: {gameId}</h2>}

      <div className="flex flex-wrap items-stretch w-full">
        {Object.entries(teams).map(([teamName, teamData]) => (
          <div key={teamName} className={styles.teamList}>
            <h2>{teamName}</h2>
            <div className={styles.teamMembers}>
              {teamData.players.length > 0 ? (
                teamData.players.map((player: string, index: number) => (
                  <h3 key={index}>{player}</h3>
                ))
              ) : (
                <li className="italic text-orange-300 opacity-40 list-none">
                  No players yet
                </li>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpectateLobby;
