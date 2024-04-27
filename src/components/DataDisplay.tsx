import { Box, Button, Heading, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import { propsType } from "./gameReducer";
import ColorModeButton from "./helpers/colorModeButton";

export default function DataDisplay(props: propsType) {
	const { gameState, dispatch } = props;

	// Situation
	const { currentPlayerIndex,
		currentPhase,
		vyingForPlace,
		playerList,
		askedQuestions,
		devMode } = gameState;
	const currentPlayer = playerList[currentPlayerIndex];

	// Devmode
	const toggle_dev_mode = () => dispatch({ type: 'toggle_dev_mode' });

	return (
		<Stack id="devModeBox">
			<Stack id="specialControls" p={8} direction={{ base: 'column', sm: 'row' }}>
				<ColorModeButton />
				<Button id="devModeToggle" onClick={toggle_dev_mode}>
					{devMode ? <>{"Dev Mode is On"}</> : <>{"Dev Mode is Off"}</>}
				</Button>
			</Stack>
			{/* {If devMode is on, then return the text} */}
			{devMode ? (<Box id="devData" whiteSpace={'normal'} maxWidth={'50%'}>
				<Heading as={'h3'}>gameState values:</Heading>
				<UnorderedList>
					<ListItem>Phase: {currentPhase}</ListItem>
					<ListItem>Current Player: {currentPlayerIndex} - {currentPlayer.name}</ListItem>
					<ListItem>Vying for place: {vyingForPlace}</ListItem>
					<ListItem>askedQuestions: {askedQuestions}</ListItem>
					<ListItem>Correct categories for each player:</ListItem>
					<UnorderedList listStyleType={''}>
						{playerList.map((player, index) => {
							return (<ListItem key={index}>{player.name}: {player.correctCategories.join(', ')}</ListItem>)
						})}
					</UnorderedList>
				</UnorderedList>
				<Heading as={'h3'}>Changes to game flow:</Heading>
				<UnorderedList>
					<ListItem>'Needed to win' is set to 2 when in dev mode</ListItem>
					<ListItem>Choosing a category with dev mode on will use a dummy question instead of querying the API.</ListItem>
					<ListItem>When in dev mode, the game will not auto-advance.  Click the 'Next Player' button to advance.</ListItem>
				</UnorderedList>
				{/* Display the gamestate in a readable format */}
			</Box>) : null}
		</Stack>)
}