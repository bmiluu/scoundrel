import type { CardValue, PlayingCard } from "../game/types"
import styles from "../css/CardView.module.css"
type Props = {
    card: PlayingCard
    onClick?: () => void
    style?: React.CSSProperties
}

export function CardView({ card, onClick, style }: Props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card} onClick={onClick} style={style}>
                <img src={card.image} alt={card.code} />
            </div>
        </div>
    )
}

export function getCardType(card: PlayingCard) {
    switch (card.suit) {
        case "HEARTS":
            return "heal"

        case "DIAMONDS":
            return "weapon"

        default:
            return "monster"
    }
}

export function getCardValue(value: CardValue): number {
    switch (value) {
        case "ACE":
            return 14
        case "KING":
            return 13
        case "QUEEN":
            return 12
        case "JACK":
            return 11
        default:
            return Number(value)
    }
}