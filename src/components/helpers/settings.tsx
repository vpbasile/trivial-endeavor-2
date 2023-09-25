import { player, category, phaseDefinition } from "./dataStructures"

// <><><> Game Globals
export const namesToUse = ["Agamemnon", "Boethius", "Charlemagne", "Donatello"]

export const players: player[] = [
    { index: 0, name: namesToUse[0], correctCategories: [], wonPlace: 0 },
    { index: 1, name: namesToUse[1], correctCategories: [], wonPlace: 0 }
]

export const categoryList: category[] = [
    { key: "00", queryTag: "none", title: "x", color: "black" },
    { key: "08", queryTag: "science", title: "Science", color: "green" },
    { key: "02", queryTag: "geography", title: "Geography", color: "blue" },
    { key: "04", queryTag: "history", title: "History", color: "yellow" },
    { key: "03", queryTag: "general_knowledge", title: "General Knowledge", color: "pink" },
    { key: "01", queryTag: "food_and_drink", title: "Food & Drink", color: "cyan" },
    { key: "05", queryTag: "sport_and_leisure", title: "Sport & Leisure", color: "orange" },
    { key: "07", queryTag: "music", title: "Music", color: "purple" },
    { key: "06", queryTag: "movies", title: "Film & TV", color: "red" },
]

export function neededToWin(devMode: boolean): number { if (devMode) { return 2 } else { return categoryList.length - 1 } }