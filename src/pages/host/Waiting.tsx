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

      <div className="flex flex-col justify-center items-center w-full">
        {Array.from(teams, ([name, value]) => ({ name, value })).map((team) => {
          return (
            <div key={team.name} className={styles.teamList}>
              <h2>{team.name}</h2>
              <div className={styles.teamMembers}>
                <h3>Player 33</h3>
                <h3>Player 33</h3>
                <h3>Player 33</h3>
                <h3>Player 33</h3>
                <h3>Player 33</h3>
                <h3>Player 33</h3>
                {Array.from(team.value.players, ([name]) => ({ name })).map(
                  (player) => {
                    return <h3 key={player.name}>{player.name}</h3>;
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Waiting;
