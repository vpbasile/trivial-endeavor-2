import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Heading } from "@chakra-ui/react";
import { Dispatch } from "react";
import { player, whatsHappeningHolder, winners } from "../helpers/dataStructures";
import { category, getQuestion, questionInternal } from "../question/queryTheTrivia";

type CategoryButtonProps = {
	key: string,
	// <><><> Dev mode stuff
	devMode: boolean
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder, setwhatsHappening: Dispatch<whatsHappeningHolder>,
	currentQuestion: questionInternal, setCurrentQuestion: Dispatch<questionInternal>,
	scoreState: player[],
	guessedYet: boolean, setguessedYet: Dispatch<boolean>,
	SETdisplayMessage: Dispatch<JSX.Element>;
	// <><><> Winning
	vyingForPlace: winners;
	// <><><> Game Globals
	categoryList: category[],
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
	// const categoryList = props.categoryList;
	// <><><> Question Globals
	// <><><> Player and category we're iterating on 
	const player = props.player;
	const category = props.category;
	// <><><> Derivative values

	async function newQuestion(currentPlayerIndex: number, category: category) {
		setwhatsHappening({
			currentPhase: "Answer",
			currentPlayerIndex: currentPlayerIndex,
		});
	
		const categoryTitle = category.title;
		console.log(`${player.name} requests a ${categoryTitle} question`);
	
		// Create a temporary question while we wait for the API to respond
	
		setguessedYet(false);
		// <> Set a temp question while we wait
		setCurrentQuestion({
				categoryTag: category.queryTag,
				questionText: "Loading...",
				choices: ["Loading...", "Loading...", "Loading...", "Loading..."],
				correctAnswer: "Loading...",
				correctIndex: 0,
			});
	
		try {
			// Use await within the async function
			const question = await getQuestion(category.queryTag, devMode);
			// Update the game state with the new question
			setCurrentQuestion(question);
			SETdisplayMessage(<Heading id='displayMessage' as='h2' whiteSpace={'normal'}>{category.title}</Heading>);
		} catch (error) {
			console.error("Error fetching question:", error);
			// Handle the error appropriately, e.g., show an error message to the user
		}
	}	

	const checkmark = <CheckCircleIcon />
	const buttonKey = player.name + '_' + category.queryTag;
	const colorScheme = category.color;


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
		return (<Button colorScheme={colorScheme} onClick={() => newQuestion(player.index, category)}>{category.title}</Button>
		);
	}
	// // Else (it is not the current player's turn and they have not completed this category), show the category as not completed
	return (<Button key={buttonKey} isDisabled={true} colorScheme={category.color}>{category.title}</Button>);
}