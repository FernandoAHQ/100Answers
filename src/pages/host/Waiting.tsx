import { Team } from "../../types/teams";
import styles from "./host.module.css";
function Waiting({
  gameId,
  teams,
}: {
  gameId: string | null;
  teams: Map<string, Team>;
}) {
  console.log(teams);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className={styles.waitingTitle}>
        {gameId ? "Waiting on Players..." : "Creating Game"}
      </h1>

      {gameId && <h2 className={styles.code}>Code: {gameId}</h2>}

      <div className="flex flex-wrap items-stretch w-full">
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
    </div>
  );
}

export default Waiting;
