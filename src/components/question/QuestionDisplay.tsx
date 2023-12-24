import { Box, Heading } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { guessType, player, whatsHappeningHolder, winners } from "../helpers/dataStructures";
import { ordinal, sleep } from "../helpers/routines";
import AnswerButton from './AnswerButton';
import { category, questionInternal } from "./queryTheTrivia";

type QuestionProps = {
	// <><><> Dev mode stuff	
	devMode: boolean;
	neededToWin: number;
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder; setwhatsHappening: Dispatch<whatsHappeningHolder>;
	currentQuestion: questionInternal;
	questionCategoryTag: string;
	scoreState: player[]; setScoreState: Dispatch<SetStateAction<player[]>>;
	guessedYet: boolean; setguessedYet: Dispatch<boolean>;
	guessEntered: guessType; SETguessEntered: Dispatch<guessType>
	SETdisplayMessage: Dispatch<string>;
	// <><><> Winning
	vyingForPlace: winners; SETvyingForPlace: Dispatch<winners>;
	// <><><> Game Globals
	categoryList: category[];
};

export default function QuestionDisplay(props: QuestionProps): JSX.Element | null {

	// <><><> Dev mode stuff
	// const devMode = props.devMode;
	const neededToWin = props.neededToWin;
	// <><><> What's happening
	const whatsHappening = props.whatsHappening;
	const setwhatsHappening = props.setwhatsHappening;
	// <><><> Continue with the What's happening
	const currentQuestion = props.currentQuestion
	const questionCategoryTag = currentQuestion.categoryTag;
	const scoreState = props.scoreState; const setScoreState = props.setScoreState;
	const guessedYet = props.guessedYet; const setguessedYet = props.setguessedYet;
	const SETdisplayMessage = props.SETdisplayMessage;
	// <><><> Winning
	const vyingForPlace = props.vyingForPlace;
	// <><><> Game Globals
	const categoryList = props.categoryList;
	// <><><> Question Globals
	const questionText = currentQuestion.questionText;
	const choices: string[] = currentQuestion.choices;

	// <><><> Derivative values
	const playerCount = scoreState.length; // THis should be a const, maybe FIXTHIS
	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];

	function handleGuess(guess: number, currentPlayerIndex: number, questionCategoryTag: string): void {
		const currentPlayer = scoreState[currentPlayerIndex];
		setwhatsHappening({
			currentPhase: "Answer",
			currentPlayerIndex: currentPlayerIndex
		})
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
		sleep(5000).then(() => moveOn(nextPlayerIndex))
	}


	function moveOn(nextPlayerIndex: number) {
		const currentPlayerName = scoreState[nextPlayerIndex].name;
		SETdisplayMessage(`Select a category, ${currentPlayerName}`)
		// Update the game state
		setwhatsHappening({
			currentPhase: "Select",
			currentPlayerIndex: nextPlayerIndex
		});
		// console.log(`===== <> Now it is ${currentPlayerName}'s turn <> =====`);
	}

	function updatedScore(playerIndex: number, categoryTag: string) {
		const temp = scoreState;
		temp[playerIndex].correctCategories.push(categoryTag);
		const currenPlayerScore = temp[playerIndex].correctCategories.length;

		setScoreState(temp);
		return currenPlayerScore;
	}

	function nextPlayer(current: number, playerCount: number, neededToWin: number, scoreState: player[]): number {
		// let foundPlayer = null;
		// console.log(`Finding next player`)
		for (let i = 1; i < playerCount; i++) {
			const nextPlayerIndex = (current + i) % playerCount;
			const thatPlayer = scoreState[nextPlayerIndex];
			const thatPlayerScore = (thatPlayer.correctCategories).length;
			// console.log(`Should ${thatPlayer.name} be next?  Their score is ${thatPlayerScore}/${neededToWin}`);
			if (thatPlayerScore < neededToWin) {
				console.log(`${thatPlayer.name} is next.`)
				return nextPlayerIndex;
			}
		}
		return (current + 1) % playerCount;

	}

	// Make answer buttons
	let buttonIndex = -1;

	const answerButtons = choices.map((choice) => {
		// If the choice is null, return a disabled button and exit
		// console.log(`Choice: ${choice}`);
		buttonIndex++;
		const isCorrect = (buttonIndex === currentQuestion.correctIndex);
		return (
			<AnswerButton
				scoreState={scoreState} setScoreState={setScoreState}
				whatsHappening={whatsHappening}
				guessedYet={guessedYet} setguessedYet={setguessedYet}
				guessEntered={props.guessEntered}
				isCorrectChoice={isCorrect}
				key={buttonIndex}
				index={buttonIndex}
				text={choice}
				isDisabled={(props.guessEntered !== null)}
				currentQuestion={currentQuestion} handleGuess={handleGuess} />
		);
	});

	return (
		// FIXME Need to have a way to give this box the color of the current category
		// FIXME It should also display the category title
		<Box id="questionWrapper">
			<Heading id="display-question" bg={'gray.500'} p={8} borderRadius={'lg'}>{questionText}</Heading>
			<Box id="buttonWrapper" p={2}>{answerButtons}</Box>
		</Box>
	);
}