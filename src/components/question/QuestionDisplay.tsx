import { Dispatch, SetStateAction } from "react";
import { category, phaseDefinition, categoryTag, player, questionInternal, choices, whatsHappeningHolder, winners } from "../helpers/dataStructures";
import AnswerButton from './AnswerButton';
import { Box, Heading } from "@chakra-ui/react";

type QuestionProps = {
	// <><><> Dev mode stuff	
	devMode: boolean;
	neededToWin: number;
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder; setwhatsHappening: Dispatch<whatsHappeningHolder>;
	currentQuestion: questionInternal; setCurrentQuestion: Dispatch<questionInternal>;
	questionCategoryTag: string;
	scoreState: player[]; setScoreState: Dispatch<SetStateAction<player[]>>;
	guessedYet: boolean; setguessedYet: Dispatch<boolean>;
	displayMessage: string; SETdisplayMessage: Dispatch<string>;
	// <><><> Winning
	vyingForPlace: winners; SETvyingForPlace: Dispatch<winners>;
	// <><><> Game Globals
	categoryList: category[];
	phases: phaseDefinition[];
};

export default function Question(props: QuestionProps): JSX.Element | null {

	// <><><> Dev mode stuff
	const devMode = props.devMode;
	const neededToWin = props.neededToWin;
	// <><><> What's happening
	const whatsHappening = props.whatsHappening;
	const setwhatsHappening = props.setwhatsHappening;
	// ====== Pause to check if we need to render
	if (!devMode && (whatsHappening.currentPhase.title === "Welcome")) { return null; }
	// <><><> Continue with the What's happening
	const currentQuestion = props.currentQuestion
	const setCurrentQuestion = props.setCurrentQuestion;
	const questionCategoryTag = currentQuestion.categoryTag;
	const scoreState = props.scoreState; const setScoreState = props.setScoreState;
	const guessedYet = props.guessedYet; const setguessedYet = props.setguessedYet;
	const SETdisplayMessage = props.SETdisplayMessage;
	// <><><> Winning
	const vyingForPlace = props.vyingForPlace;
	// <><><> Game Globals
	const categoryList = props.categoryList;
	const phases = props.phases;
	// <><><> Question Globals
	const questionText = currentQuestion.questionText;
	const choices: choices = currentQuestion.choices;

	// <><><> Derivative values
	const playerCount = scoreState.length; // THis should be a const, maybe FIXTHIS
	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];

	function handleGuess(guess: number, currentPlayerIndex: number, questionCategoryTag: string): void {
		// <> FIXME - When the determined to be correct or incorrect, we should log a message to the console and maybe also to the user
		const currentPlayer = scoreState[currentPlayerIndex];
		// console.log(`${currentPlayer.name} guesses ${guess}`);
		const tempQuestionState = currentQuestion
		tempQuestionState.guessEntered = guess
		setCurrentQuestion(tempQuestionState)
		const x = phases.find(phase => phase.title === "Answer")
		// FIXTHIS Neet to make this safer
		if (x) {
			setwhatsHappening({
				currentPhase: x,
				currentPlayerIndex: currentPlayerIndex
			})
		}
		const question = props.currentQuestion;
		const correctChoice = question.correctIndex;
		let stuff;
		if (guess === correctChoice) {
			const messageText = `Correct! ${currentPlayer.name} has completed the ${questionCategory.title} category`;
			stuff = messageText;
			// If the player guessed correctly, add questionCategoryTag to the player's score
			console.log(messageText);
			const winCheck = updatedScore(currentPlayerIndex, questionCategoryTag);
			// let tempWinners = Array.from(winners);
			if (winCheck >= neededToWin) {
				console.log(`${scoreState[currentPlayerIndex].name} has gotten enough points!`)
				scoreState[currentPlayerIndex].wonPlace = vyingForPlace;
				stuff = `${currentPlayer.name} wins ${ordinal(vyingForPlace)} place!  Everyone else is playing for ${ordinal(vyingForPlace + 1)}.`
				props.SETvyingForPlace(vyingForPlace + 1)
			}
		} else {
			// If the player was incorrect
			const messageText = `Incorrect!  The correct answer was: ${question.choices[correctChoice]}`;
			stuff = messageText;
			console.log(messageText);
		}
		SETdisplayMessage(stuff)
		// Now that feedback has been given, move to the next player
		const nextPlayerIndex = nextPlayer(currentPlayerIndex, playerCount, neededToWin, scoreState);
		// Now tell them whether their guess was correct or not.  Also present a button to go to the next player's turn.



		// Pause then advance to the next player
		// FIXME Every time i use this find, I should be using a map instead
		// sleep(5000).then(() => moveOn(nextPlayerIndex))
	}

	function ordinal(number: number): string {
		switch (number) {
			case 1: return "first";
			case 2: return "second";
			case 3: return "third";
			default: return "last";
		}
	}

	function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

	function moveOn(nextPlayerIndex: number) {
		const currentPlayerName = scoreState[nextPlayerIndex].name;
		SETdisplayMessage(`Select a category, ${currentPlayerName}`)
		const y = props.phases.find(phase => phase.title === "Select");
		// Update the game state
		if (y) {
			// FIXTHIS Neet to make this safer
			setwhatsHappening({
				currentPhase: y,
				currentPlayerIndex: nextPlayerIndex
			});
		}
		// console.log(`===== <> Now it is ${currentPlayerName}'s turn <> =====`);
	}

	function updatedScore(playerIndex: number, categoryTag: categoryTag) {
		const temp = scoreState;
		temp[playerIndex].correctCategories.push(categoryTag);
		const currenPlayerScore = temp[playerIndex].correctCategories.length;

		setScoreState(temp);
		return currenPlayerScore;
	}

	function nextPlayer(current: number, playerCount: number, neededToWin: number, scoreState: player[]): number {
		// let foundPlayer = null;
		console.log(`Finding next player`)
		for (let i = 1; i < playerCount; i++) {
			const nextPlayerIndex = (current + i) % playerCount;
			const thatPlayer = scoreState[nextPlayerIndex];
			const thatPlayerScore = (thatPlayer.correctCategories).length;
			console.log(`Should ${thatPlayer.name} be next?  Their score is ${thatPlayerScore}/${neededToWin}`);
			if (thatPlayerScore < neededToWin) {
				console.log(`${thatPlayer.name} is next.`)
				return nextPlayerIndex;
			}
		}
		return (current + 1) % playerCount;

	}

	// Make answer buttons
	let buttonIndex = 0;

	const answerButtons = choices.map((choice) => {
		// If the choice is null, return a disabled button and exit
		// console.log(`Choice: ${choice}`);
		const isCorrect = (buttonIndex === currentQuestion.correctIndex);
		return (
			<>
				<AnswerButton
					scoreState={scoreState} setScoreState={setScoreState}
					whatsHappening={whatsHappening}
					guessedYet={guessedYet} setguessedYet={setguessedYet}
					isCorrectChoice={isCorrect}
					key={buttonIndex}
					index={buttonIndex++}
					text={choice}
					isDisabled={(currentQuestion.guessEntered === null)}
					currentQuestion={currentQuestion} handleGuess={handleGuess} />
			</>
		);
	});

	return (
		// FIXME Need to have a way to give this box the color of the current category
		// FIXME It should also display the category title
		<Box id="questionWrapper">
			<Heading id="display-question" bg={'gray.500'} p={5} m={5} borderRadius={'lg'}>{questionText}</Heading>
			{answerButtons}
		</Box>
	);
}