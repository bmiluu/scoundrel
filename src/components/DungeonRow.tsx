import type { PlayingCard } from "../game/types"
import { CardView } from "./CardView"
import styles from "../css/DungeonRow.module.css"

type Props = {
    cards: PlayingCard[]
    remaining: number
    onCardClick: (card: PlayingCard) => void
}

export function DungeonRow({ cards, remaining, onCardClick }: Props) {
    return (
        <div className={styles.dungeonRow}>
            <div className={styles.cards}>
                {cards.map((card, index) =>
                    <CardView 
                    key={card.code} 
                    card={card} 
                    style={{ animationDelay: `${index * 80}ms` }}
                    onClick={()=> onCardClick(card)}/>
                )}

            </div>
            <span>Remaining cards: {remaining}</span>
        </div>
    )
}