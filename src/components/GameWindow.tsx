import { useEffect, useMemo, useState } from "react";
import type { GameState } from "../game/types";
import { GameManager } from "../game/GameManager";
import { DungeonRow } from "./DungeonRow";
import { PlayerStats } from "./PlayerStats";
import { WeaponSlot } from "./WeaponSlot";
import { startDeck } from "../services/deckApi";

export function GameWindow(){
    const game = useMemo(()=> new GameManager(), [])
    const [state, setState] = useState<GameState>(game.createInitialState())
    const [remaining, setRemaining] = useState(0)

    useEffect(()=> {
        async function init() {
            const {room, remaining} = await startDeck()
            
            setState(prev=> game.setRoom(prev, room))
            setRemaining(remaining)
        }
        init()
    }, [game])

    return(
        <div className="game">
            <DungeonRow cards={state.room} remaining={remaining}/>
            <PlayerStats health={state.health}/>
            <WeaponSlot weapon={state.weapon}/>
            {state.gameOver}
        </div>
    )
}