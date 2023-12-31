import { Box, Button } from "@chakra-ui/react";
import { guessType, propsType } from "../gameReducer";
import { categoryList, questionInternal } from "../helpers/queryTheTrivia";
import { handleGuess } from "./handleGuess";

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
				onClick={() => handleGuess(question, buttonIndex, gameState.playerList[currentPlayerIndex], questionCategoryTag, neededToWin, dispatch, gameState.devMode)}
			>
				{buttonText}
			</Button>
		</Box>
	);
}
