export type Suit =
  | "HEARTS"
  | "DIAMONDS"
  | "CLUBS"
  | "SPADES";

export type CardValue =
  | "ACE"
  | "KING"
  | "QUEEN"
  | "JACK"
  | "10"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

export interface PlayingCard{
    code: string,
    image: string,
    images: {
        svg: string,
        png: string
    },
    value: CardValue,
    suit: Suit
}

export interface GameState {
    health: number;
    room: PlayingCard[];
    weapon: PlayingCard | null;
    gameOver: boolean;
}