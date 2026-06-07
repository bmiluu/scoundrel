import styles from "../css/GameOverScreen.module.css"

type Props = {
    victory: boolean,
    onRestart: () => void
}

export function GameOverScreen({victory, onRestart} : Props) {
    return(
        <div className={styles.overlay}>
            <h1>{victory == true ? "Game Over! You won!" : "Game Over! You lost!"}</h1>
            <button onClick={onRestart}>Restart</button>
        </div>
    )
}