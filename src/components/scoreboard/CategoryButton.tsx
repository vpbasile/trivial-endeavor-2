import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { nullQuestion, player, propsType } from "../gameReducer";
import { category, getQuestion } from "../helpers/queryTheTrivia";

interface categoryButtonProps extends propsType { category: category, player: player, isDisabled: boolean }

export default function CategoryButton(props: categoryButtonProps) {
	const { gameState, dispatch, isDisabled } = props;
	const player = gameState.playerList[gameState.currentPlayerIndex];
	const devMode = gameState.devMode;

	// Props unique to this component
	const category = props.category;

	const newQuestion = async (currentPlayerIndex: number, category: category) => {
		// Enter answer mode
		dispatch({ type: "SETsituation", payload: { phase: "Answer", currentPlayerIndex: currentPlayerIndex } });
		// Update the UI
		const categoryTitle = category.title;
		console.log(`${player.name} requests a ${categoryTitle} question`);
		// Clear the question while we wait for the API to respond
		dispatch({ type: "clear_question" });

		if (devMode) { return nullQuestion; }
		else {
			try {
				// Use await within the async function
				const question = await getQuestion(category.queryTag, gameState.devMode);
				// Update the game state with the new question
				dispatch({ type: "SETcurrentQuestion", payload: question });				
			} catch (error) {
				console.error("Error fetching question:", error);
				// Handle the error appropriately, e.g., show an error message to the user
			}
		}
	}

	const buttonKey = player.name + '_' + category.queryTag;
	// const colorScheme = category.color;


	// If the player is a winner, the button should be gold and disabled.
	const hasWon = player.wonPlace;
	if (hasWon) {
		switch (hasWon) {
			case 1: return (<Button key={buttonKey} isDisabled={true} colorScheme="yellow">First place!</Button>);
			case 2: return (<Button key={buttonKey} isDisabled={true} colorScheme="cyan">Second place!</Button>);
			case 3: return (<Button key={buttonKey} isDisabled={true} colorScheme="orange">Third place!</Button>);
		}
	} else {
		if (player.correctCategories.includes(category.queryTag)) {
			// If the player has already completed this category, show the category as completed and disabled.
			return (
				<Button
					key={buttonKey}
					leftIcon={<CheckCircleIcon />}
					isDisabled={true}
					colorScheme={category.color}
					onClick={() => newQuestion(gameState.currentPlayerIndex, category)}
				>
					{category.title}
				</Button>
			);
		} else {
			// If the player has not completed this category, show the category as not completed.
			// If the player is not the current player, show the category as disabled.
			return (
				<Button
					key={buttonKey}
					isDisabled={isDisabled}
					colorScheme={category.color}
					onClick={() => newQuestion(gameState.currentPlayerIndex, category)}
				>
					{category.title}
				</Button>
			);
		}
	}
}