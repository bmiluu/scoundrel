type Props = {
    health: number
}

export function PlayerStats({health}:Props){
    return(
        <div className="stats">
            <h2>HP: {health}</h2>
        </div>
    )
}