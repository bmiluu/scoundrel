import type { GameState, PlayingCard } from "./types";

export class GameManager{

    createInitialState(): GameState{
        return {
            health: 20,
            room: [],
            weapon: null,
            gameOver: false
        }
    }

    setRoom(state: GameState ,cards: PlayingCard[]): GameState {
        return{
            ...state,
            room: cards
        }
    }

    damage(state: GameState, amount: number): GameState {
        const newHealth = state.health - amount

        return{
            ...state,
            health: newHealth,
            gameOver: newHealth <= 0
        }
    }
}