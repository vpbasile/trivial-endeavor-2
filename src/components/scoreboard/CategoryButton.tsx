// API info:
// https://trivia.willfry.co.uk/

// https://api.trivia.willfry.co.uk/questions?categories=food_and_drink,geography,general_knowledge,history,literature,movies,music,science,society_and_culture,sport_and_leisure&limit=1

import { Dispatch } from "react";
import { category, choices, phaseDefinition, player, questionInternal, whatsHappeningHolder, winners } from "../helpers/dataStructures";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
// import { zzColor } from "../gameboard";

type CategoryButtonProps = {
	key: string,
	// <><><> Dev mode stuff
	devMode: boolean
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder, setwhatsHappening: Dispatch<whatsHappeningHolder>,
	currentQuestion: questionInternal, setCurrentQuestion: Dispatch<questionInternal>,
	scoreState: player[],
	guessedYet: boolean, setguessedYet: Dispatch<boolean>,
	displayMessage: string; SETdisplayMessage: Dispatch<string>;
	// messageColor: zzColor; SETmessageColor: Dispatch<zzColor>;
	// <><><> Winning
	vyingForPlace: winners;
	// <><><> Game Globals
	categoryList: category[],
	phases: phaseDefinition[],
	// <><><> Player and category we're iterating on 
	category: category,
	player: player,
	// <><><> Derivative values
}

export default function CategoryButton(props: CategoryButtonProps) {
	// <><><> Dev mode stuff
	const devMode = props.devMode;
	// <><><> What's happening
	const whatsHappening = props.whatsHappening, setwhatsHappening = props.setwhatsHappening;
	const setCurrentQuestion = props.setCurrentQuestion;
	const setguessedYet = props.setguessedYet;
 const SETdisplayMessage = props.SETdisplayMessage;
//  const SETmessageColor=props.SETmessageColor
	// <><><> Winning
	// const vyingForPlace = props.vyingForPlace;
	// <><><> Game Globals
	const categoryList = props.categoryList;
	const phases = props.phases;
	// <><><> Question Globals
	// <><><> Player and category we're iterating on 
	const player = props.player;
	const category = props.category;
	// <><><> Derivative values

	function newQuestion(currentPlayerIndex: number, category: category) {
		const temp = phases.find((phase: { title: string; }) => phase.title === "Answer");
		// FIXTHIS Need to error handle
		if (temp) {
			setwhatsHappening({
				currentPhase: temp,
				currentPlayerIndex: currentPlayerIndex
			})
		}
		// console.log(`Freshly set game phase:`)
		// console.log(`whatsHappening: ${JSON.stringify(whatsHappening)}`);
		const categoryTitle = category.title
		console.log(`${player.name} requests a ${categoryTitle} question`);
		// <> Old formats of the API request:
		// let queryURL = `https://api.trivia.willfry.co.uk/questions?categories=${category.queryTag}&limit=1`
		// let queryURL = `https://the-trivia-api.com/questions?categories=food_and_drink&limit=1`
		const queryURL = `https://the-trivia-api.com/api/questions?categories=${category.queryTag}&limit=1`;
		// Create a temporary question while we wait for the API to respond
		const tempQuestion: questionInternal = {
			categoryTag: category.queryTag,
			questionText: "Loading...",
			choices: ["Loading...", "Loading...", "Loading...", "Loading..."],
			correctAnswer: "Loading...",
			correctIndex: 0,
			guessEntered: 0
		}
		setguessedYet(false);
		setCurrentQuestion(tempQuestion);
		getQuestion(queryURL);
	}
	async function getQuestion(url: RequestInfo | URL) {
		// If we're in devMode, we'll use the local copy of the API
		// if (devMode) { parseReceivedQuestion(spoofQuestion) }
		// else {
		// Query the API for a new question and parse it	
		fetch(url).then(response => response.json())
			.then(data => { parseReceivedQuestion(data[0]); })
			.catch(error => { console.log(error); });
		// }
	}

	type questionFromAPI = {
		correctAnswer: string;
		incorrectAnswers: string[];
		category: string;
		question: string;
	}

	function parseReceivedQuestion(data: questionFromAPI) {
		console.log(`Parsing question`);
		// <> Parse the received question into the game's data structure
		// Make sure we don't have more than 4 incorrect answers
		const incorrectAnswers: string[] = data.incorrectAnswers.slice(0, 4);
		const choicesCount = incorrectAnswers.length + 1
		shuffleArray(incorrectAnswers);
		const answerIndex = Math.floor(Math.random() * (choicesCount));
		const choices: choices = ["", "", "", ""]
		choices[answerIndex] = data.correctAnswer;
		for (let i = 0; i < choicesCount; i++) {
			if (i === answerIndex) { choices[i] = data.correctAnswer; }
			else {
				const x = incorrectAnswers.pop()
				if (x !== undefined) { choices[i] = x; }
			}
		}
		const categoryName: string = data.category;
		// This is where we get the category object from the list
		const category: category[] = categoryList.filter((categoryTemp) => {
			return categoryTemp.title === categoryName;
		});

		const categoryTag: string = category[0].queryTag;

		const questionObject: questionInternal = {
			questionText: data.question,
			choices: choices,
			correctAnswer: data.correctAnswer,
			correctIndex: answerIndex,
			categoryTag: categoryTag,
			guessEntered: 0
		}
		// Send the question to the database to be saved
		// DEV environment only
		// console.log(`Attempting to save question`)
		// try {
		// 	fetch("http://localhost:8000/trivia/save/", {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify(questionObject),
		// 	});
		// } catch (error) { console.error("Error encountered", (error as Error).message); }

		if (devMode) {
			// Hide the answer data so I don't learn anything while I'm debugging
			console.log(`=====Hiding answers=====`);
			let choiceCount = 0;
			choices.forEach(() => {
				if (choiceCount === questionObject.correctIndex) questionObject.choices[choiceCount] = "Correct answer"
				else questionObject.choices[choiceCount] = "Incorrect answer"
				choiceCount++;
			})
		}
		// Update the game state with the new question
		setCurrentQuestion(questionObject);
		SETdisplayMessage(categoryName);
		// SETmessageColor(category[0].color)
	}

	function shuffleArray(array: string[]): string[] {
		let curId: number = array.length;
		// There remain elements to shuffle
		while (0 !== curId) {
			// Pick a remaining element
			const randId = Math.floor(Math.random() * curId);
			curId -= 1;
			// Swap it with the current element.
			const tmp = array[curId];
			array[curId] = array[randId];
			array[randId] = tmp;
		}
		return array;
	}

	const checkmark = <CheckCircleIcon />
	const buttonKey = player.name + '_' + category.queryTag;

	// <> Build the button
	// During the welcome phase, all buttons should be disabled
	// if (whatsHappening.currentPhase.title === "Welcome") {
	// 	return (<Button key={buttonKey} colorScheme={category.color} isDisabled={true} >{category.title}</Button>
	// 	)
	// }
	// If the player is a winner, the button should be gold.
	const hasWon = player.wonPlace;
	if (hasWon) {
		switch (hasWon) {
			case 1: return (<Button key={buttonKey} isDisabled={true} colorScheme="yellow">First place!</Button>);
			case 2: return (<Button key={buttonKey} isDisabled={true} colorScheme="cyan">Second place!</Button>);
			case 3: return (<Button key={buttonKey} isDisabled={true} colorScheme="orange">Third place!</Button>);
		}
	}
	// If the player has already completed this category, show the category as completed, regardless of whether it that player's turn or not
	if (player.correctCategories.includes(category.queryTag)) return (<Button key={buttonKey} leftIcon={checkmark} isDisabled={true} colorScheme={category.color} />);

	// If it's the current player's turn, show the button
	if (player.index === whatsHappening.currentPlayerIndex) {
		return (<Button colorScheme={category.color} onClick={() => newQuestion(player.index, category)
		} >{category.title}</Button>
		);
	}
	// // Else (it is not the current player's turn and they have not completed this category), show the category as not completed
	return (<Button key={buttonKey} isDisabled={true}>{category.title}</Button>);
}