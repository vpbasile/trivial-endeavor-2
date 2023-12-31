import { Box, Heading } from "@chakra-ui/react";
import { propsType } from "../gameReducer";
import { newBreaks } from "../helpers/style";
import AnswerButton from "./AnswerButton";

export default function QuestionDisplay(props: propsType): JSX.Element | null {
	// Cache the props
	const { gameState, dispatch} = props;

	// Destructure gameState
	const { currentQuestion, guessEntered } = gameState;
	const answerChoices = currentQuestion.choices;

	// Handle the entered guess
	const guessedYet = guessEntered !== null;

	// Make answer buttons
	let buttonIndex = -1;
	const answerButtons = answerChoices.map((choice) => {
		buttonIndex++;
		// Return null if guessedyet and (it is not the correct answer and was not the guess entered)
		if (guessedYet && (buttonIndex !== currentQuestion.correctIndex && buttonIndex !== guessEntered)) return null;
		return (
			<AnswerButton
				key={buttonIndex}
				index={buttonIndex}
				text={choice}
				isDisabled={guessedYet}
				question={currentQuestion} 
				guessEntered={guessEntered}
				gameState={gameState} 
				dispatch={dispatch} />
		);
	});
	return (
		// FIXME Need to have a way to give this box the color of the current category
		<Box id="questionWrapper">
			<Heading id="display-question" bg={'gray.500'} p={8} borderRadius={'lg'} maxW={newBreaks}>{currentQuestion.questionText}</Heading>
			<Box id="buttonWrapper" p={2}>{answerButtons}</Box>
		</Box>
	);
}