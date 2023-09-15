import { Dispatch } from "react";
import { player, questionInternal, whatsHappeningHolder } from "../helpers/dataStructures";
import { Box, Button } from "@chakra-ui/react";

type AnswerButtonProps = {
	key: number, index: number,
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder,
	currentQuestion: questionInternal,
	scoreState: player[], setScoreState: Dispatch<player[]>,
	guessedYet: boolean, setguessedYet: Dispatch<boolean>,
	// <><><> Game Globals
	// <><><> Button-specific Globals
	text: string,
	disabled: boolean,
	handleGuess: (buttonIndex: number, currentPlayerIndex: number, questionCategoryTag: string) => void,
}

export default function AnswerButton(props: AnswerButtonProps) {
	// <><><> What's happening
	const whatsHappening = props.whatsHappening
	const currentQuestion = props.currentQuestion
	// ====== If the question is null, the player has not selected a question yet
	if (currentQuestion === undefined) { return null; }
	// <><><> If we have a question, continue with 
	const guessedYet = props.guessedYet; const setguessedYet = props.setguessedYet;
	// <><><> Game Globals
	// <><><> Button-specific Globals
	const buttonIndex = props.index;
	const buttonText = props.text;
	const handleGuess = props.handleGuess;
	// <><><> Derivative values
	const currentPlayerIndex = whatsHappening.currentPlayerIndex;
	const questionCategoryTag = currentQuestion.categoryTag;

	const buttonID = `choice-${buttonIndex}`;


	return (
		<Box>
			<Button id={buttonID} w="100%" m="2"
				disabled={guessedYet}
				onClick={() => { setguessedYet(true); handleGuess(buttonIndex, currentPlayerIndex, questionCategoryTag) }} >
				{buttonText}
			</Button>
		</Box>
	);
}