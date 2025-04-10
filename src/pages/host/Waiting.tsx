import { Team } from "../../types/teams";
import styles from "./host.module.css";
function Waiting({
  gameId,
  teams,
  startGame,
}: {
  gameId: string | null;
  teams: Map<string, Team>;
  startGame: (gameId: string) => void;
}) {
  console.log(teams);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className={styles.waitingTitle}>
        {gameId ? "Waiting on Players..." : "Creating Game"}
      </h1>
      {gameId && <h2 className={styles.code}>Code: {gameId}</h2>}
      {gameId && (
        <button
          disabled={!verifyPlayers(teams)}
          className={styles.startBtn}
          onClick={() => {
            if (!verifyPlayers(teams)) {
              alert(
                "Please add players to all teams before starting the game."
              );
              return;
            }
            startGame(gameId);
          }}
        >
          Start Game
        </button>
      )}
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

const verifyPlayers = (teams: Map<string, Team>): boolean => {
  let pass = true;
  teams.forEach((team) => {
    if (team.players.size <= 0) {
      pass = false;
    }
  });
  return pass;
};

export default Waiting;
