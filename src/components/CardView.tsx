import type { PlayingCard } from "../game/types"
import styles from "../css/CardView.module.css"
type Props = {
    card: PlayingCard
    onClick?: () => void
}

export function CardView({card, onClick}:Props){
    return(
        <div className={styles.card} onClick={onClick}>
            <img src={card.image} alt={card.code}/>
        </div>
    )
}