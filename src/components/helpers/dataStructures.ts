export type categoryTag = string
export type guessType = null | number;
export type winners = number;
export type player = { index: number, name: string, correctCategories: string[], wonPlace: winners, key?: number }
export type category = { key: string, queryTag: categoryTag, title: string, color: string }
export type gamePhase = "Welcome" | "Select" | "Question" | "Answer" | "Feedback" | "Score" | "End"
export type whatsHappeningHolder = { currentPhase: gamePhase, currentPlayerIndex: number }
export type choices = string[]
export type questionInternal = {
  questionText: string | null, choices: choices,
  correctAnswer: string | null,
  correctIndex: number,
  categoryTag: categoryTag
}
