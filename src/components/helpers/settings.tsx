import { player } from "./dataStructures"

// <><><> Game Globals
export const namesToUse = ["Agamemnon", "Boethius", "Charlemagne", "Donatello"]

export const players: player[] = [
    { index: 0, name: namesToUse[0], correctCategories: [], wonPlace: 0 },
    { index: 1, name: namesToUse[1], correctCategories: [], wonPlace: 0 }
]

export function neededToWin(devMode: boolean): number { if (devMode) { return 2 } else { return 8 } }