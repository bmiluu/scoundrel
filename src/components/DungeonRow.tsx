import type { PlayingCard } from "../game/types"
import { CardView } from "./CardView"
import styles from "../css/DungeonRow.module.css"

type Props = {
    cards: PlayingCard[]
    remaining: number
}

export function DungeonRow({ cards, remaining }: Props) {
    return (
        <div className={styles.dungeonRow}>
            <div className={styles.cards}>
                {cards.map(card =>
                    <CardView key={card.code} card={card} />
                )}

            </div>
            <span>Remaining cards: {remaining}</span>
        </div>
    )
}