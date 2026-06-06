import type { PlayingCard } from "../game/types"

export interface DeckResponse {
    success: boolean,
    deck_id: string,
    remaining: number,
    shuffled: boolean,
}

interface DrawCardResponse {
    success: boolean,
    deck_id: string,
    remaining: number,
    cards: PlayingCard[]
}

export async function createDeck(): Promise<DeckResponse> {
    const response = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    )

    return response.json()
}

export async function drawCards(deckId: string, count: number): Promise<DrawCardResponse> {
    const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
    )

    if(!response.ok)
        throw new Error("Failed to draw cards");

    return response.json()
}

export async function startDeck() {
    const deck = await createDeck();
    const room = await drawCards(deck.deck_id, 4);

    return {
        deckId: deck.deck_id,
        room: room.cards,
        remaining: room.remaining
    }
}