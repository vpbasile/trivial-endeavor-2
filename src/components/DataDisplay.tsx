import { player, whatsHappeningHolder } from "./helpers/dataStructures"
import { Box, Button, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import ColorModeButton from "./helpers/colorModeButton";

type DataDisplayProps = {
	// <><><> Dev mode stuff
	devMode: boolean, toggleDevMode: () => void,
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder,
	scoreState: player[],
	// <><><> Derivative values
	players: player[],
	vyingForPlace: number,
}

export default function DataDisplay(props: DataDisplayProps) {
	// <><><> Dev mode stuff
	const devMode = props.devMode; const toggleDevMode = props.toggleDevMode
	// <><><> What's happening
	const whatsHappening = props.whatsHappening;
	const scoreState = props.scoreState;
	const vyingForPlace = props.vyingForPlace;

	// Icons
	// const isOff = <IconButton aria-label='Search database' id="devModeToggle" icon={<SearchIcon />} onClick={() => toggleDevMode()} />
	// const isOn = <IconButton aria-label="" id="devModeToggle" icon={<EditIcon />} onClick={() => toggleDevMode()} />


	// <><><> Derivative values
	const currentPlayerIndex = whatsHappening.currentPlayerIndex;
	const currentPlayer = scoreState[currentPlayerIndex];


	return (
		<Stack id="devModeBox">
			<Stack id="specialControls" p={8} direction={{base:'column',sm:'row'}}>
				<ColorModeButton />
				<Button id="devModeToggle" onClick={toggleDevMode}>
					{devMode ? <>{"Development Mode is On"}</> : <>{"Development Mode is Off"}</>}
				</Button>
			</Stack>
			{/* {If devMode is on, then return the text} */}
			{devMode ? (<Box id="devData" whiteSpace={'normal'} maxWidth={'50%'}>
				<UnorderedList>
					<ListItem>Player: {currentPlayer.name}</ListItem>
					<ListItem>Phase: {whatsHappening.currentPhase}</ListItem>
					<ListItem>Vying for place: {vyingForPlace}</ListItem>
					<ListItem>'Needed to win' is set to 2 when in dev mode</ListItem>
					<ListItem>Choosing a category with development mode on will hide the values of the answer choices and will instead display which is the correct choice.</ListItem>
				</UnorderedList>
			</Box>) : null}
		</Stack>)
}