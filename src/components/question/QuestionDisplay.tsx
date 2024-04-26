import { CheckCircleIcon, CloseIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import { propsType } from "../gameReducer";
import { newBreaks } from "../helpers/style";
import AnswerButton from "./AnswerButton";
import NextTurnButton from "./NextTurnButton";

export default function QuestionDisplay(props: propsType): JSX.Element | null {
	// Cache the props
	const { gameState, dispatch } = props;

	// Destructure gameState
	const { currentQuestion, guessEntered } = gameState;
	const answerChoices = currentQuestion.choices;

	// Handle the entered guess

	// Make answer buttons
	let buttonIndex = -1;

	function answerButtons() {
		switch (gameState.currentPhase) {
			// If we're in the answer phase, return the four gray buttons
			case ("Answer"): return answerChoices.map((choice) => {
				buttonIndex++;
				return (
					<AnswerButton
						key={buttonIndex}
						index={buttonIndex}
						text={choice}
						isDisabled={guessEntered !== null}
						question={currentQuestion}
						guessEntered={guessEntered}
						icon={<QuestionOutlineIcon />}
						gameState={gameState}
						dispatch={dispatch} />
				);
			});
			// If we're in the feedback phase, return the four buttons with the correct answer green and the incorrect answer red
			case ("Feedback"): return answerChoices.map((choice) => {
				buttonIndex++;
				let colorOverride
				// Color the correct answer green
				if (buttonIndex === currentQuestion.correctIndex) {
					colorOverride = 'green';
				}
				// If the guess was incorrect, color the incorrect answer red
				else if (buttonIndex === guessEntered) {
					colorOverride = 'red';
				}
				// Otherwise, make the button gray'
				else {
					colorOverride = 'gray';
				}
				return (
					<AnswerButton
						key={buttonIndex}
						index={buttonIndex}
						text={choice}
						isDisabled={true}
						question={currentQuestion}
						guessEntered={guessEntered}
						icon={choice === currentQuestion.correctAnswer ? <CheckCircleIcon /> : <CloseIcon />}
						colorOverride={colorOverride}
						gameState={gameState}
						dispatch={dispatch} />
				);
			});
		}
	}
	return (
		// FIXME Need to have a way to give this box the color of the current category
		<Box id="questionWrapper">
			{(gameState.currentPhase === "Feedback") && <NextTurnButton gameState={gameState} dispatch={dispatch} />}
			<Heading id="display-question" bg={'gray.500'} p={8} borderRadius={'lg'} maxW={newBreaks}>{currentQuestion.questionText}</Heading>
			<Box id="buttonWrapper" p={2}>{answerButtons()}</Box>
		</Box>
	);
}