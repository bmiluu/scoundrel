import { getCardValue } from "../components/CardView";
import type { GameState, PlayingCard } from "./types";

export class GameManager{

    createInitialState(): GameState{
        return {
            health: 20,
            room: [],
            weapon: null,
            gameOver: false,
            victory: false,
            deck_id: ""
        }
    }

    setRoom(state: GameState, cards: PlayingCard[]): GameState {
        return{
            ...state,
            room: cards
        }
    }

    setDeckID(state: GameState, id: string): GameState {
        return{
            ...state,
            deck_id: id
        }
    }

    damage(state: GameState, monsterStrength: number): GameState {
        let damage = monsterStrength
        if(state.weapon){
            damage = Math.max(0, monsterStrength - getCardValue(state.weapon.value))
        }

        const newHealth = state.health - damage

        return{
            ...state,
            health: newHealth < 0 ? 0 : newHealth,
            gameOver: newHealth <= 0,
            victory: newHealth > 0
        }
    }

    heal(state: GameState, hp: number): GameState {
        let newHealth = state.health + hp

        if(newHealth > 20)
            newHealth = 20

        return{
            ...state,
            health: newHealth
        }
    }

    equipWeapon(state: GameState, weapon: PlayingCard): GameState{
        return{
            ...state,
            weapon: weapon
        }
    }

    checkWin(state: GameState, remaining: number): boolean{
        return remaining === 0 && state.room.length === 0
    }
}