export type categoryTag = string

export type winners = number;
export type player = { index: number, name: string, correctCategories: string[], wonPlace: winners, key?:number }
export type category = { key: string, queryTag: categoryTag, title: string, color: string }
export type phaseDefinition = { key: string, title: string, index: number }
export type whatsHappeningHolder = { currentPhase: phaseDefinition, currentPlayerIndex: number }
export type choices = string[]
export type questionInternal = {
  questionText: string | null, choices: choices,
  correctAnswer: string | null,
  correctIndex: number,
  categoryTag: categoryTag,
  guessEntered: number
}