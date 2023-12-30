/**
 * This file contains the game reducer and related types for the trivia game.
 * It defines the game state, game actions, and the game reducer function.
 * It also includes helper functions for managing the game flow.
 *
 * @packageDocumentation
 */
import { Dispatch } from "react";
import { categoryList, questionInternal } from "./helpers/queryTheTrivia";
import { wrapHeading } from "./helpers/routines";

export type guessType = null | number;
export type winners = number;
export type player = { index: number, name: string, correctCategories: string[], wonPlace: winners, key?: number }
export type gamePhase = "Welcome" | "Select" | "Question" | "Answer" | "Feedback" | "Score" | "End"
export type situationHolder = { phase: gamePhase, currentPlayerIndex: number }

export type GameAction =
    // Setup actions
    { type: "add_player" } | // Payload is the player index for the new player
    { type: "remove_player" } | // Payload is the player index to be removed
    { type: "begin_game" } |
    { type: "toggleDevMode" } |
    // Universal actions
    { type: "SETdisplayMessage", payload: JSX.Element } | // Payload is the JSX contents for the display box
    // Question actions
    { type: "set_guess_entered", payload: guessType } |
    { type: "do_winner", payload: number } | // Payload is the player index for the player who just won
    { type: "clear_question" } |
    { type: "SETcurrentQuestion", payload: questionInternal } |
    // Game flow actions
    { type: "nextPlayer", payload: { currentPlayerIndex: number, neededToWin: number } } | // Payload is the player index for the next player
    { type: "give_player_score", payload: { playerIndex: number, categoryTag: string } } | // Payload is the player index for the player who is scoring and categoryTag for the category they are scoring
    { type: "set_player_place", payload: { playerIndex: number, place: number } } |
    // ------------------------------------------------------------------------------------------------
    { type: "SETaskedQuestions", payload: string[] } |
    { type: "SETvyingForPlace", payload: winners } |
    { type: "SETsituation", payload: situationHolder } |
    { type: "SETplayerList", payload: player[] };
    
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
    
    export const nullQuestion = { questionText: "What would a question look like if there were one?", choices: ["Just like the above", "With words much like the ones above", "Nothing like the below", "All of the above"], correctAnswer: "Just like the above", correctIndex: 0, categoryTag: categoryList[0].queryTag };
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
    currentQuestion: nullQuestion,
    vyingForPlace: 1,
    guessEntered: null,
    playerList: [newPlayer(0),newPlayer(1)],
    askedQuestions: [""],
    devMode: true,
}

export default function gameReducer(state: gameStateType, action: GameAction): gameStateType {
    switch (action.type) {
        case "add_player": {
            // Add another player to the playerList array
            const newPlayerIndex = state.playerList.length;
            return { ...state, playerList: [...state.playerList, newPlayer(newPlayerIndex)] };
        }
        // Remove the last player in the playerList array
        case "remove_player": return { ...state, playerList: [...state.playerList.slice(0, (state.playerList.length - 1))] };
        case "begin_game":

            // Begin the game
            return { ...state, currentPhase: "Select", currentPlayerIndex: 0, displayMessage: wrapHeading(`${state.playerList[0].name}, select a question to begin!`) };
        case "toggleDevMode": {
            const newValue = state.devMode ? false : true;
            newValue ? console.log("Dev mode is now off") : console.log("Dev mode is now on")
            return { ...state, devMode: newValue };
        }
        case "clear_question":
            return { ...state, currentQuestion: nullQuestion };
        case "do_winner": {
            const winningPlayer = state.playerList[action.payload];
            const vyingForPlace = state.vyingForPlace;
            console.log(`${winningPlayer.name} has gotten enough points!`)
            winningPlayer.wonPlace = vyingForPlace;
            // Increment the vyingForPlace counter and update the winning players wonPlace
            return { ...state, vyingForPlace: vyingForPlace + 1, playerList: [...state.playerList] };
        }
        case "nextPlayer": {
            const gameState = state;
            const { currentPlayerIndex, neededToWin } = action.payload;
            const zzz = nextPlayer(gameState.playerList.length, currentPlayerIndex, neededToWin, gameState.playerList);
            // Upate the current phase to select and the current player index to the next player
            return { ...state, currentPhase: "Select", currentPlayerIndex: zzz };
        }
        case "give_player_score": {
            const playerIndex = action.payload.playerIndex;
            const categoryTag = action.payload.categoryTag;
            const player = state.playerList[playerIndex];
            player.correctCategories.push(categoryTag);
            console.log(`${player.name} has scored in ${categoryTag}.`);
            // Update the playerList
            return { ...state, playerList: [...state.playerList] };
        }
        case "set_player_place": {
            const playerIndex = action.payload.playerIndex;
            const place = action.payload.place;
            const player = state.playerList[playerIndex];
            player.wonPlace = place;
            // Update the playerList
            return { ...state, playerList: [...state.playerList] };
        }
        case "SETdisplayMessage":
            return { ...state, displayMessage: action.payload };
        case "SETaskedQuestions":
            return { ...state, askedQuestions: action.payload };
        case "set_guess_entered":
            return { ...state, guessEntered: action.payload };
        case "SETvyingForPlace":
            return { ...state, vyingForPlace: action.payload };
        case "SETcurrentQuestion":
            return { ...state, currentQuestion: action.payload };
        case "SETsituation":
            return { ...state, currentPhase: action.payload.phase, currentPlayerIndex: action.payload.currentPlayerIndex };
        case "SETplayerList":
            return { ...state, playerList: action.payload };
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