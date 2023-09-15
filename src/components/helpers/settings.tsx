import { player, category, phaseDefinition } from "./dataStructures"

// <><><> Game Globals
export const namesToUse = ["Agamemnon", "Boethius", "Charlemagne", "Donatello"]

export const players: player[] = [
    { index: 0, name: namesToUse[0], correctCategories: [], wonPlace: 0 },
    { index: 1, name: namesToUse[1], correctCategories: [], wonPlace: 0 }
]

export const categoryList: category[] = [
    { key: "00", queryTag: "none", title: "Select a category", color: "black" },
    { key: "08", queryTag: "science", title: "Science", color: "green" },
    { key: "02", queryTag: "geography", title: "Geography", color: "blue" },
    { key: "04", queryTag: "history", title: "History", color: "yellow" },
    { key: "03", queryTag: "general_knowledge", title: "General Knowledge", color: "pink" },
    { key: "01", queryTag: "food_and_drink", title: "Food & Drink", color: "cyan" },
    { key: "05", queryTag: "sport_and_leisure", title: "Sport & Leisure", color: "orange" },
    { key: "07", queryTag: "music", title: "Music", color: "purple" },
    { key: "06", queryTag: "movies", title: "Film & TV", color: "red" },
]

export const gamePhases: phaseDefinition[] = [
    // FIXME This would be much better as a map
    { key: "00", title: "Welcome", index: 1 },
    { key: "02", title: "Select", index: 2 },
    { key: "04", title: "Question", index: 4 },
    { key: "06", title: "Answer", index: 6 },
    { key: "07", title: "Feedback", index: 7 },
    { key: "08", title: "Score", index: 8 },
    { key: "10", title: "End", index: 10 }
]

export function neededToWin(devMode: boolean): number { if (devMode) { return 2 } else { return categoryList.length - 1 } }