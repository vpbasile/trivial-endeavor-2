import { Box, Button, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
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
	const toggleDevMode = () => dispatch({ type: 'toggleDevMode' });

	return (
		<Stack id="devModeBox">
			<Stack id="specialControls" p={8} direction={{ base: 'column', sm: 'row' }}>
				<ColorModeButton />
				<Button id="devModeToggle" onClick={toggleDevMode}>
					{devMode ? <>{"Dev Mode is On"}</> : <>{"Deve Mode is Off"}</>}
				</Button>
			</Stack>
			{/* {If devMode is on, then return the text} */}
			{devMode ? (<Box id="devData" whiteSpace={'normal'} maxWidth={'50%'}>
				<UnorderedList>
					<ListItem>Player {currentPlayerIndex}: {currentPlayer.name}</ListItem>
					<ListItem>Phase: {currentPhase}</ListItem>
					<ListItem>Vying for place: {vyingForPlace}</ListItem>
					<ListItem>'Needed to win' is set to 2 when in dev mode</ListItem>
					<ListItem>Choosing a category with dev mode on will hide the values of the answer choices and will instead display which is the correct choice.</ListItem>
					<ListItem>askedQuestions: {askedQuestions}</ListItem>
				</UnorderedList>
			</Box>) : null}
		</Stack>)
}