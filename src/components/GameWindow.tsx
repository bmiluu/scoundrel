import { useEffect, useMemo, useState } from "react";
import type { GameState, PlayingCard } from "../game/types";
import { GameManager } from "../game/GameManager";
import { DungeonRow } from "./DungeonRow";
import { PlayerStats } from "./PlayerStats";
import { WeaponSlot } from "./WeaponSlot";
import { drawCards, startDeck } from "../services/deckApi";
import { getCardType, getCardValue } from "./CardView";
import { GameOverScreen } from "./GameOverScreen";

export function GameWindow(){
    const game = useMemo(()=> new GameManager(), [])
    const [state, setState] = useState<GameState>(game.createInitialState())
    const [remaining, setRemaining] = useState(0)

    async function handleCardClick(card: PlayingCard){
        const type = getCardType(card)

        let newState = state

        switch(type){
            case "heal":
                newState = game.heal(state, getCardValue(card.value))
                break
            case "weapon":
                newState = game.equipWeapon(state, card)
                break
            case "monster":
                newState = game.damage(state, getCardValue(card.value))
                break
        }

        const drawResult = await drawCards(state.deck_id, 1)

        setRemaining(drawResult.remaining)
        if(game.checkWin(state, drawResult.remaining)){
            setState(prev=> ({
                ...prev,
                gameOver: true,
                victory: true
            }))
        }
        
        const replacement = drawResult.cards[0]

        const updateRoom = newState.room.filter(c => c.code !== card.code)

        if(replacement){
            updateRoom.push(replacement)
        }

        setState({
            ...newState,
            room: updateRoom
        })
    }

    async function restartGame() {
        const {deckId, room, remaining} = await startDeck();
        setState(
            game.setRoom(
                {
                    ...game.createInitialState(),
                    deck_id: deckId
                },
                room
            )
        )
        setRemaining(remaining)
    }

    useEffect(()=> {
        async function init() {
            const {room, remaining, deckId} = await startDeck()
            
            setState(prev=> game.setRoom(prev, room))
            setState(prev=> game.setDeckID(prev, deckId))
            setRemaining(remaining)
        }
        init()
    }, [game])

    return(
        <div className="game">
            <DungeonRow cards={state.room} remaining={remaining} onCardClick={handleCardClick}/>
            <PlayerStats health={state.health}/>
            <WeaponSlot weapon={state.weapon}/>
            {state.gameOver && <GameOverScreen victory={state.victory} onRestart={restartGame}/>}
        </div>
    )
}