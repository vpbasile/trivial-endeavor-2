/**
 * This file contains the game reducer and related types for the trivia game.
 * It defines the game state, game actions, and the game reducer function.
 * It also includes helper functions for managing the game flow.
 *
 * @packageDocumentation
 */
import { Dispatch } from "react";
import { categoryList, questionInternal } from "./helpers/queryTheTrivia";
import { getCategory, wrapHeading } from "./helpers/routines";

export type categoryTag = string
export type category = { key: string, queryTag: categoryTag, title: string, color: string }
export type guessType = null | number;
export type winners = number;
export type player = { index: number, name: string, correctCategories: string[], wonPlace: winners, key?: number }
export type gamePhase = "Welcome" | "Select" | "Question" | "Answer" | "Feedback" | "Score" | "End"
export type situationHolder = { phase: gamePhase, currentPlayerIndex: number }

export type gameStateType = {
    currentPhase: gamePhase,
    currentPlayerIndex: number,
    displayMessage: JSX.Element,
    currentQuestion: questionInternal,
    vyingForPlace: number,
    guessEntered: guessType,
    playerList: player[],
    askedQuestions: string[],
    devMode: boolean,
}

export function nullQuestion(overrideCategory?: categoryTag): questionInternal { return { questionText: "What would a question look like if there were one?", choices: ["Just like the above", "With words much like the ones above", "Nothing like the below", "All of the above"], correctAnswer: "Just like the above", correctIndex: 0, categoryTag: overrideCategory || categoryList[0].queryTag } }
const namesToUse = ["Agamemnon", "Boethius", "Charlemagne", "Donatello", "Euripides", "Fibonacci", "Genghis Khan", "Homer", "Isaac Newton", "Julius Caesar", "Kublai Khan", "Leonardo da Vinci", "Machiavelli", "Napoleon", "Ovid", "Plato", "Quintilian", "Raphael", "Socrates", "Thucydides", "Ulysses", "Virgil", "William Shakespeare", "Xenophon", "Yoda", "Zeno of Citium"]
function newPlayer(playerIndex: number) {
    return {
        index: playerIndex, key: playerIndex, name: namesToUse[Math.floor(Math.random() * namesToUse.length)],
        correctCategories: [], wonPlace: 0
    };
}
export const initialGameState: gameStateType = {
    currentPhase: "Welcome",
    currentPlayerIndex: 0,
    displayMessage: wrapHeading("Welcome! You can play with up to 4 teams."),
    currentQuestion: nullQuestion(),
    vyingForPlace: 1,
    guessEntered: null,
    playerList: [newPlayer(0), newPlayer(1)],
    askedQuestions: [""],
    devMode: false,
}


export type GameAction =
    // Universal actions
    { type: "SETdisplayMessage", payload: JSX.Element } | // Payload is the JSX contents for the display box
    // Setup actions
    { type: "add_player" } | // Payload is the player index for the new player
    { type: "remove_player" } | // Payload is the player index to be removed
    { type: "toggle_dev_mode" } |
    // Game flow actions
    { type: "phase_begin_game" } |
    { type: "phase_next_player" } | // Payload is the player index for the next player
    { type: "phase_get_question" } |
    { type: "phase_answer_question", payload: questionInternal } |
    { type: "phase_feedback", payload: { guess: guessType, message: JSX.Element } } |
    // Question actions
    { type: "give_player_score", payload: { playerIndex: number, categoryTag: string } } | // Payload is the player index for the player who is scoring and categoryTag for the category they are scoring
    // Are these two actions redundant?
    { type: "player_win", payload: { playerIndex: number } } |
    { type: "clear_question" } |
    { type: "SETaskedQuestions", payload: string[] } // Payload is the id of the new question to add to the list

export default function gameReducer(state: gameStateType, action: GameAction): gameStateType {
    switch (action.type) {
        // Universal actions
        case "SETdisplayMessage":
            return { ...state, displayMessage: action.payload };
        // Setup actions
        case "add_player": {
            // Add another player to the playerList array
            const newPlayerIndex = state.playerList.length;
            return { ...state, playerList: [...state.playerList, newPlayer(newPlayerIndex)] };
        }
        case "remove_player":
            // Remove the last player in the playerList array
            return { ...state, playerList: [...state.playerList.slice(0, (state.playerList.length - 1))] };
        case "toggle_dev_mode": {
            const newValue = state.devMode ? false : true;
            newValue ? console.log("Dev mode is now off") : console.log("Dev mode is now on")
            return { ...state, devMode: newValue };
        }
        // Game flow actions
        case "phase_begin_game":
            // Begin the game
            console.log("Beginning the game");
            return { ...state, currentPhase: "Select", currentPlayerIndex: 0, displayMessage: wrapHeading(`${state.playerList[0].name}, select a question to begin!`) };
        case "phase_next_player": {
            const gameState = state;
            const currentPlayerIndex = gameState.currentPlayerIndex;
            const neededToWin = gameState.devMode ? 2 : categoryList.length;
            const whichPlayer = nextPlayer(gameState.playerList.length, currentPlayerIndex, neededToWin, gameState.playerList);
            // Upate the current phase to select and the current player index to the next player
            return { ...state, currentPhase: "Select", currentPlayerIndex: whichPlayer, guessEntered: null, displayMessage: wrapHeading(`${state.playerList[whichPlayer].name}, select a question!`) };
        }
        case "phase_get_question": return { ...state, currentPhase: "Question", currentQuestion: nullQuestion(), displayMessage: wrapHeading(`Please wait`) };
        case "phase_answer_question": {
            const question = action.payload;
            const categoryTag = question.categoryTag;
            const category = getCategory(categoryList, categoryTag);
            return { ...state, currentPhase: "Answer", currentQuestion: question, displayMessage: wrapHeading(category.title, category.color) };
        }
        case "phase_feedback": {
            const { guess, message } = action.payload;
            // Enable the next player button
            return { ...state, guessEntered: guess, currentPhase: "Feedback", displayMessage: message };
        }
        // Question actions
        case "player_win": {
            const { playerIndex } = action.payload;
            const winningPlayer = state.playerList[playerIndex];
            const vyingForPlace = state.vyingForPlace;
            console.log(`${winningPlayer.name} has gotten enough points!`)
            winningPlayer.wonPlace = vyingForPlace;
            // Increment the vyingForPlace counter and update the winning players wonPlace
            return { ...state, vyingForPlace: vyingForPlace + 1, playerList: [...state.playerList] };
        }
        case "give_player_score": {
            const { playerIndex, categoryTag } = action.payload;
            // If the player has not already gotten this category
            if (state.playerList[playerIndex].correctCategories.includes(categoryTag)) {
                console.log("Player has already gotten this category");
                return state;
            }
            const updatedPlayerList = [...state.playerList];
            const updatedPlayer = { ...updatedPlayerList[playerIndex] };
            updatedPlayer.correctCategories.push(categoryTag);
            updatedPlayerList[playerIndex] = updatedPlayer;
            return { ...state, playerList: updatedPlayerList };
        }
        case "SETaskedQuestions":
            return { ...state, askedQuestions: action.payload };
        default:
            return state;
    }
}

// The props for the came components should mosly be the same
export interface propsType {
    gameState: gameStateType,
    dispatch: Dispatch<GameAction>,
}

function nextPlayer(playerCount: number, currentPlayerIndex: number, neededToWin: number, playerList: player[]): number {
    for (let i = 1; i < playerCount; i++) {
        const nextPlayerIndex = (currentPlayerIndex + i) % playerCount;
        const thatPlayer = playerList[nextPlayerIndex];
        const thatPlayerScore = (thatPlayer.correctCategories).length;
        if (thatPlayerScore < neededToWin) {
            console.log(`${thatPlayer.name} is next.`)
            return nextPlayerIndex;
        }
    }
    return (currentPlayerIndex + 1) % playerCount;
}