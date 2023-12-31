import { Dispatch } from "react";
import { GameAction, categoryTag, player } from "../gameReducer";
import { questionInternal } from "../helpers/queryTheTrivia";
import { sleep, wrapHeading } from "../helpers/routines";

/**
 * Handles the player's guess.
 * @param guess - The index of the guessed answer.
 * @param currentPlayerIndex - The index of the current player.
 * @param category - The category of the question.
 * @param neededToWin - The number of points needed to win the game.
 */
export function handleGuess(question: questionInternal, guess: number, player: player, category: categoryTag, neededToWin: number, dispatch: Dispatch<GameAction>, devMode?:boolean): void {
    const correctIndex = question.correctIndex;
    console.log(`${player.name} guessed choice ${guess}: ${question.choices[guess]}.`);
    if (guess === correctIndex) {
        // If the player guessed correctly, 
        console.log("That is correct!");
        dispatch({ type: "phase_feedback", payload: { guess, message: wrapHeading('Correct!') } });
        dispatch({ type: "give_player_score", payload: { playerIndex: player.index, categoryTag: category } });
        // If the player has enough points to win, set their place and move on to the next player
        if (player.correctCategories.length >= neededToWin) {
            dispatch({ type: "player_win", payload: { playerIndex: player.index } });
        }
    } else {
        const message = `That is incorrect.  The correct answer was`;
        console.log(message, `${correctIndex}: ${question.choices[correctIndex]}`)
        dispatch({ type: "phase_feedback", payload: { guess, message: wrapHeading(message) } });
    }
    // If we're not in devmode, then wait 5 seconds before moving on to the next player
    if (!devMode) {
        sleep(5000).then(() => {
            dispatch({ type: "phase_next_player" });
        }); // Wait 5 seconds before moving on to the next player
    }
}