import { Box, Button } from "@chakra-ui/react";
import { guessType, propsType } from "../gameReducer";
import { categoryList, categoryTag, questionInternal } from "../helpers/queryTheTrivia";

/**
 * Props for the AnswerButton component.
 */
interface AnswerButtonProps extends propsType {
	key: number;
	index: number;
	question: questionInternal; // The question object
	guessEntered: guessType; // The guess entered by the player
	text: string; // The text displayed on the button
	isDisabled: boolean; // Whether the button is disabled
}

/**
 * AnswerButton component.
 * Renders a button for answering a question.
 */
export default function AnswerButton(props: AnswerButtonProps) {
	const { gameState, dispatch } = props;
	const currentPlayerIndex = gameState.currentPlayerIndex;
	const question = props.question;

	// If the question is null, the player has not selected a question yet
	if (question === undefined) { return null; }

	const buttonIndex = props.index;
	const buttonText = props.text;
	const questionCategoryTag = question.categoryTag;
	const isDisabled = props.isDisabled;
	const neededToWin = gameState.devMode ? 2 : categoryList.length;

	const buttonID = `choice-${buttonIndex}`;

	let color = "gray";
	if (gameState.guessEntered) {
		if (buttonIndex === question.correctIndex) color = "green";
		else color = "red";
	}

	return (
		<Box py={2}>
			<Button
				colorScheme={color}
				id={buttonID}
				whiteSpace={'normal'}
				w={'100%'}
				py={2}
				isDisabled={isDisabled}
				onClick={() => handleGuess(buttonIndex, currentPlayerIndex, questionCategoryTag, neededToWin)}
			>
				{buttonText}
			</Button>
		</Box>
	);
	/**
	 * Handles the player's guess.
	 * @param guess - The index of the guessed answer.
	 * @param currentPlayerIndex - The index of the current player.
	 * @param category - The category of the question.
	 * @param neededToWin - The number of points needed to win the game.
	 */
	function handleGuess(guess: number, currentPlayerIndex: number, category: categoryTag, neededToWin: number): void {
		const correctIndex = question.correctIndex;
		console.log(`${gameState.playerList[currentPlayerIndex].name} guessed choice ${guess}: ${question.choices[guess]}.`);
		console.log(`The correct answer was ${correctIndex}: ${question.choices[correctIndex]}.`)
		dispatch({ type: "set_guess_entered", payload: guess });
		if (guess === correctIndex) {
			// If the player guessed correctly, 
			// add category to the player's score
			dispatch({ type: "give_player_score", payload: { playerIndex: currentPlayerIndex, categoryTag: category } });
			// If the player has enough points to win, set their place and move on to the next player
			const playerScore = gameState.playerList[currentPlayerIndex].correctCategories.length;
			if (playerScore >= neededToWin) {
				dispatch({ type: "set_player_place", payload: { playerIndex: currentPlayerIndex, place: 1 } });
				// Move on to the next player
				// ...
			}
		}
		// Otherwise, tell them they were correct and to wait for the next player
		// ...
	}
}
