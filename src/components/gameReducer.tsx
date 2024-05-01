/**
 * This file contains the game reducer and related types for the trivia game.
 * It defines the game state, game actions, and the game reducer function.
 * It also includes helper functions for managing the game flow.
 *
 * @packageDocumentation
 */
import { VStack } from "@chakra-ui/react";
import { Dispatch } from "react";
import { categoryList, questionInternal } from "./helpers/queryTheTrivia";
import { getCategory, ordinal, winnerColor } from "./helpers/routines";
import { SameButton } from "./helpers/SameButton";

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
    playerIndicator: string,
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
const namesToUse = ["Player 1", "Player 2", "Player 3", "Player 4"]
// const otherNames = ["Aristotle", "Boethius", "Charlemagne", "Donatello", "Euripides", "Fibonacci", "Genghis Khan", "Homer", "Isaac Newton", "Julius Caesar", "Kublai Khan", "Leonardo da Vinci", "Machiavelli", "Napoleon", "Ovid", "Plato", "Quintilian", "Raphael", "Socrates", "Thucydides", "Ulysses", "Virgil", "William Shakespeare", "Xenophon", "Yoda", "Zeno of Citium"];
function newPlayer(playerIndex: number) {
    return {
        index: playerIndex, key: playerIndex, name: namesToUse[playerIndex] || "Player" + playerIndex,
        correctCategories: [], wonPlace: 0
    };
}

const devModeDefault = false;

export const initialGameState: gameStateType = {
    currentPhase: "Welcome",
    currentPlayerIndex: 0,
    playerIndicator: "Player 0",
    displayMessage: <SameButton text={"Welcome! You can play with up to 4 teams."} />,
    currentQuestion: nullQuestion(),
    vyingForPlace: 1,
    guessEntered: null,
    playerList: [newPlayer(0), newPlayer(1), newPlayer(2), newPlayer(3)],
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
    { type: "phase_1_begin_game" } |
    { type: "phase_5_next_player" } | // Payload is the player index for the next player
    { type: "phase_2_get_question" } |
    { type: "phase_3_answer_question", payload: { question: questionInternal, playerIndex: number } } |
    { type: "phase_4_feedback", payload: { guess: guessType, message: JSX.Element } } |
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
            const { playerList } = state;
            const newPlayerIndex = playerList.length;
            return { ...state, playerList: [...playerList, newPlayer(newPlayerIndex)] };
        }
        case "remove_player": {
            // Remove the last player in the playerList array
            const { playerList } = state;
            return { ...state, playerList: [...playerList.slice(0, (playerList.length - 1))] };
        }
        case "toggle_dev_mode": {
            const devMode = state.devMode ? false : true;
            devMode ? console.log("Dev mode is now off") : console.log("Dev mode is now on")
            const neededToWin = devMode ? 2 : categoryList.length;
            return { ...state, devMode, neededToWin };
        }
        // Game flow actions
        case "phase_1_begin_game":
            // Begin the game
            console.log("-Begin phase_1_begin_game-");
            return { ...state, currentPhase: "Select", currentPlayerIndex: 0, playerIndicator: state.playerList[0].name, displayMessage: <SameButton text={`Select a category to begin!`} /> };
        case "phase_2_get_question": {
            // Get a question of the selected category for the current player
            console.log("-Begin phase_2_get_question-");
            return { ...state, currentPhase: "Question", currentQuestion: nullQuestion(), displayMessage: <SameButton text={`Please wait`} /> };
        }
        case "phase_3_answer_question": {
            // Display the choices
            console.log("-Begin phase_3_answer_question-");
            const { question } = action.payload;
            const categoryTag = question.categoryTag;
            const category = getCategory(categoryList, categoryTag);
            const buttonContents = category ? <SameButton text={category.title} color={category.color} /> : "Category";
            return {
                ...state, currentPhase: "Answer", currentQuestion: question, displayMessage: <>
                    {buttonContents}
                </>
            };
        }
        case "phase_4_feedback": {
            // Display the feedback
            console.log("-Begin phase_4_feedback-");
            const { currentPlayerIndex, neededToWin, playerList } = state;
            const { guess, message } = action.payload;
            // These two lines are written the same 
            const whoIsNext = nextPlayer(currentPlayerIndex, neededToWin, playerList);
            const playerIndicator = `${playerList[whoIsNext].name}, you're up next!`;
            return { ...state, guessEntered: guess, playerIndicator, currentPhase: "Feedback", displayMessage: message };
        }
        case "phase_5_next_player": {
            // Move on to the next player
            console.log("-Begin phase_5_next_player-");
            const { currentPlayerIndex, neededToWin, playerList } = state
            const whichPlayer = nextPlayer(currentPlayerIndex, neededToWin, playerList);
            const playerIndicator = playerList[whichPlayer].name;
            console.log(`It is now ${playerIndicator}'s turn.`)
            // Upate the current phase to select and the current player index to the next player
            return { ...state, currentPhase: "Select", currentPlayerIndex: whichPlayer, playerIndicator, guessEntered: null, displayMessage: <SameButton text={`Select a question!`} /> };

        }
        // Question actions
        case "give_player_token": {
            console.log("-Begin give_player_token-");
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
            return { ...state, playerList: updatedPlayerList, displayMessage: <SameButton text={message} />, currentPhase: "Feedback" };
        }
        case "give_player_medal": {
            console.log("-Begin give_player_medal-");
            // <><> FIXME Win condition is not working
            const { playerIndex } = action.payload;
            const { playerList, vyingForPlace, neededToWin } = state;
            const winningPlayer = playerList[playerIndex];
            const whoIsNext = nextPlayer(playerIndex, neededToWin, playerList);
            const color = winnerColor(vyingForPlace);
            // This is displaying the correct place
            winnerColor(vyingForPlace)
            winningPlayer.wonPlace = vyingForPlace;
            // FIXME - Add handling for a single-player game
            if (vyingForPlace < playerList.length - 1) {
                // There are more medals to win, so continue the game
                const message = `${winningPlayer.name} wins ${ordinal(vyingForPlace)} place!`;
                console.log(message)
                const playerIndicator = `${playerList[whoIsNext].name}, you're up next!`;
                const displayMessage = <SameButton text={message} color={color} />
                return {
                    ...state, vyingForPlace: (vyingForPlace + 1), playerList: [...playerList], playerIndicator, displayMessage, currentPhase: "Feedback"
                };
            } else {
                // All medals have been won, so end the game
                const playerIndicator = `Game over!`
                // FIXME - This would be better if it listed the players in order of their place
                const displayMessage = <VStack>
                    {playerList.map((player, index) => {
                        const playerPlace = player.wonPlace;
                        return <SameButton text={`${player.name} - ${ordinal(playerPlace)}`} color={winnerColor(playerPlace)} key={player.name + index} />
                    })}
                </VStack>
                console.log(displayMessage)
                return { ...state, playerList: [...playerList], playerIndicator, displayMessage, currentPhase: "End" };
            }
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
/**
 * This function determines which player is next in the game.
 *
 * @param {number} currentPlayerIndex - Which player is currently taking their turn
 * @param {number} neededToWin - The number of points needed to win the game
 * @param {player[]} playerList - The list of players in the game
 * @return {*}  {number} - The index of the next player
 */
function nextPlayer(currentPlayerIndex: number, neededToWin: number, playerList: player[]): number {
    const playerCount = playerList.length;
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
    // return undefined;
}