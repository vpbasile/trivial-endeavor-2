export type guessType = null | number;
export type winners = number;
export type player = { index: number, name: string, correctCategories: string[], wonPlace: winners, key?: number }
export type gamePhase = "Welcome" | "Select" | "Question" | "Answer" | "Feedback" | "Score" | "End"
export type whatsHappeningHolder = { currentPhase: gamePhase, currentPlayerIndex: number }


