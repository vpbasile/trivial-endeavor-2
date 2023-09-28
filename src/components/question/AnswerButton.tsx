import { Dispatch } from "react";
import { guessType, player, questionInternal, whatsHappeningHolder } from "../helpers/dataStructures";
import { Box, Button } from "@chakra-ui/react";

type AnswerButtonProps = {
	key: number, index: number,
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder,
	currentQuestion: questionInternal,
	scoreState: player[], setScoreState: Dispatch<player[]>,
	guessedYet: boolean, setguessedYet: Dispatch<boolean>,
	guessEntered: guessType;
	// <><><> Game Globals
	// <><><> Button-specific Globals
	text: string,
	isDisabled: boolean,
	handleGuess: (buttonIndex: number, currentPlayerIndex: number, questionCategoryTag: string) => void,
	isCorrectChoice: boolean,
}

export default function AnswerButton(props: AnswerButtonProps) {
	// <><><> What's happening
	const whatsHappening = props.whatsHappening
	const currentQuestion = props.currentQuestion
	// ====== If the question is null, the player has not selected a question yet
	if (currentQuestion === undefined) { return null; }
	// <><><> If we have a question, continue with 
	const guessedYet = props.guessedYet; const setguessedYet = props.setguessedYet;
	// const guessEntered = props.guessEntered
	// <><><> Game Globals
	// <><><> Button-specific Globals
	const buttonIndex = props.index;
	const buttonText = props.text;
	const handleGuess = props.handleGuess;
	// <><><> Derivative values
	const currentPlayerIndex = whatsHappening.currentPlayerIndex;
	const questionCategoryTag = currentQuestion.categoryTag;
	const isDisabled = props.isDisabled

	const buttonID = `choice-${buttonIndex}`;

	let color = "gray"
	if (guessedYet) {
		if (props.isCorrectChoice) color = "green"
		else color = "red"
	}

	return (
		<Box py={2}>
			<Button colorScheme={color} id={buttonID} whiteSpace={'normal'} w={'100%'} py={2}
				isDisabled={isDisabled}
				onClick={() => { setguessedYet(true); handleGuess(buttonIndex, currentPlayerIndex, questionCategoryTag) }} >
				{buttonText}
			</Button>
		</Box>
	);
}