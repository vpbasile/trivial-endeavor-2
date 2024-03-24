/**
 * This file contains the game reducer and related types for the trivia game.
 * It defines the game state, game actions, and the game reducer function.
 * It also includes helper functions for managing the game flow.
 *
 * @packageDocumentation
 */
import { Dispatch } from "react";
import { categoryList, questionInternal } from "./helpers/queryTheTrivia";
import { getCategory, ordinal, wrapHeading } from "./helpers/routines";

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
    neededToWin: number,
}

export function nullQuestion(overrideCategory?: categoryTag): questionInternal { return { questionText: "What would a question look like if there were one?", choices: ["Correct answer", "With words much like the ones above", "Nothing like the below", "All of the above"], correctAnswer: "Correct answer", correctIndex: 0, categoryTag: overrideCategory || categoryList[0].queryTag } }
const namesToUse = ["Agamemnon", "Boethius", "Charlemagne", "Donatello", "Euripides", "Fibonacci", "Genghis Khan", "Homer", "Isaac Newton", "Julius Caesar", "Kublai Khan", "Leonardo da Vinci", "Machiavelli", "Napoleon", "Ovid", "Plato", "Quintilian", "Raphael", "Socrates", "Thucydides", "Ulysses", "Virgil", "William Shakespeare", "Xenophon", "Yoda", "Zeno of Citium"]
function newPlayer(playerIndex: number) {
    return {
        index: playerIndex, key: playerIndex, name: namesToUse.shift() || "Player" + playerIndex,
        correctCategories: [], wonPlace: 0
    };
}

const devModeDefault = false;

export const initialGameState: gameStateType = {
    currentPhase: "Welcome",
    currentPlayerIndex: 0,
    displayMessage: wrapHeading("Welcome! You can play with up to 4 teams."),
    currentQuestion: nullQuestion(),
    vyingForPlace: 1,
    guessEntered: null,
    playerList: [newPlayer(0), newPlayer(1)],
    askedQuestions: [""],
    devMode: devModeDefault,
    neededToWin: devModeDefault ? 2 : categoryList.length,
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
    { type: "give_player_token", payload: { playerIndex: number, categoryTag: string } } | // Payload is the player index for the player who is scoring and categoryTag for the category they are scoring
    // Are these two actions redundant?
    { type: "give_player_medal", payload: { playerIndex: number } } |
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
            const devMode = state.devMode ? false : true;
            devMode ? console.log("Dev mode is now off") : console.log("Dev mode is now on")
            const neededToWin = devMode ? 2 : categoryList.length;
            return { ...state, devMode, neededToWin };
        }
        // Game flow actions
        case "phase_begin_game":
            // Begin the game
            console.log("-Begin phase_begin_game-");
            return { ...state, currentPhase: "Select", currentPlayerIndex: 0, displayMessage: wrapHeading(`${state.playerList[0].name}, select a question to begin!`) };
        case "phase_next_player": {
            // Move on to the next player
            console.log("-wBegin phase_next_player-");
            const gameState = state;
            const currentPlayerIndex = gameState.currentPlayerIndex;
            const whichPlayer = nextPlayer(gameState.playerList.length, currentPlayerIndex, gameState.neededToWin, gameState.playerList);
            console.log(`It is now ${gameState.playerList[whichPlayer].name}'s turn.`)
            // Upate the current phase to select and the current player index to the next player
            return { ...state, currentPhase: "Select", currentPlayerIndex: whichPlayer, guessEntered: null, displayMessage: wrapHeading(`${state.playerList[whichPlayer].name}, select a question!`) };
        }
        case "phase_get_question": {
            // Get a question of the selected category for the current player
            console.log("-Begin phase_get_question-");
            return { ...state, currentPhase: "Question", currentQuestion: nullQuestion(), displayMessage: wrapHeading(`Please wait`) };
        }
        case "phase_answer_question": {
            // Display the choices
            console.log("-Begin phase_answer_question-");
            const question = action.payload;
            const categoryTag = question.categoryTag;
            const category = getCategory(categoryList, categoryTag);
            return { ...state, currentPhase: "Answer", currentQuestion: question, displayMessage: wrapHeading(category.title, category.color) };
        }
        case "phase_feedback": {
            // Display the feedback
            console.log("-Begin phase_feedback-");
            const { guess, message } = action.payload;
            // Enable the next player button
            console.log("-Begin phase_feedback-");
            return { ...state, guessEntered: guess, currentPhase: "Feedback", displayMessage: message };
        }
        // Question actions
        case "give_player_token": {
            // <> FIXME This is not working - it is double adding the category on the subsequest turn
            const { playerIndex, categoryTag } = action.payload;
            const updatedPlayerList = [...state.playerList];
            const updatedPlayer = { ...updatedPlayerList[playerIndex] };
            if (!updatedPlayer.correctCategories.includes(categoryTag)) updatedPlayer.correctCategories.push(categoryTag);
            updatedPlayerList[playerIndex] = updatedPlayer;
            const message = `${updatedPlayer.name} has gotten the ${categoryTag} category! They now have ${updatedPlayer.correctCategories.length} points out of ${state.neededToWin} needed to win.`
            console.log(message);
            // FIXME - This is not working - it is double adding the category on the subsequent turn
            console.log(`Their list of correct categories is now: ${updatedPlayer.correctCategories}`)
            console.log("-Begin phase_feedback-");
            return { ...state, playerList: updatedPlayerList, displayMessage: wrapHeading(message), currentPhase: "Feedback"};
        }
        case "give_player_medal": {
            // <><> FIXME Win condition is not working
            const { playerIndex } = action.payload;
            const winningPlayer = state.playerList[playerIndex];
            const vyingForPlace = state.vyingForPlace;
            const message = `${winningPlayer.name} wins ${ordinal(vyingForPlace)} place!`;
            // This is displaying the correct place
            console.log(message)
            winningPlayer.wonPlace = vyingForPlace;
            // Increment the vyingForPlace counter and update the winning players wonPlace
            console.log("-Begin phase_feedback-");
            return { ...state, vyingForPlace: (vyingForPlace + 1), playerList: [...state.playerList], displayMessage: wrapHeading(message), currentPhase: "Feedback"};
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