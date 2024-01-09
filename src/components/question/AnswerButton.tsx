import { Box, Button } from "@chakra-ui/react";
import { guessType, propsType } from "../gameReducer";
import { questionInternal } from "../helpers/queryTheTrivia";
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
	icon?: JSX.Element; // The icon displayed on the button
	colorOverride?: string; // The color of the button
}

/**
 * AnswerButton component.
 * Renders a button for answering a question.
 */
export default function AnswerButton(props: AnswerButtonProps) {
	const { gameState, dispatch } = props;
	const currentPlayerIndex = gameState.currentPlayerIndex;
	const question = props.question;
	const buttonIcon = props.icon;
	const colorOverride = props.colorOverride;
	// If the colorOverride prop is not undefined, use it. Otherwise, use gray
	const color = colorOverride ? colorOverride : "gray";

	// If the question is null, the player has not selected a question yet
	if (question === undefined) { return null; }

	const buttonIndex = props.index;
	const buttonText = props.text;
	const questionCategoryTag = question.categoryTag;
	const isDisabled = props.isDisabled;
	const neededToWin = gameState.neededToWin;

	const buttonID = `choice-${buttonIndex}`;


	// const buttonIcon = gameState.guessEntered ? (buttonIndex === question.correctIndex ? <CheckCircleIcon /> : <CloseIcon />) : <QuestionOutlineIcon />;

	return (
		<Box py={2}>
			<Button
				colorScheme={color}
				leftIcon={buttonIcon}
				rightIcon={buttonIcon}
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
