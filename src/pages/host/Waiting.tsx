import styles from "./host.module.css";
function Waiting() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className={styles.waitingTitle}>Waiting on Players...</h1>
      <div className="flex justify-between ">
        <div className={styles.teamList}>
          <h2>Team 1</h2>
          <div className={styles.teamMembers}>
            <h3>Player 1</h3>
            <h3>Player 2</h3>
            <h3>Player 3</h3>
            <h3>Player 4</h3>
            <h3>Player 5</h3>
          </div>
        </div>
        <div className={styles.teamList}>
          <h2>Team 2</h2>
          <div className={styles.teamMembers}>
            <h3>Player 1</h3>
            <h3>Player 2</h3>
            <h3>Player 3</h3>
            <h3>Player 4</h3>
            <h3>Player 5</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Waiting;
