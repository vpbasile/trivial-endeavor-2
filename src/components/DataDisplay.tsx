import { player, whatsHappeningHolder } from "./helpers/dataStructures"
import { Box, Button, Center, Checkbox, Stack } from "@chakra-ui/react";
import ColorModeButton from "./colorModeButton";

type DataDisplayProps = {
	// <><><> Dev mode stuff
	devMode: boolean, toggleDevMode: () => void,
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder,
	scoreState: player[],
	// <><><> Derivative values
	players: player[],
	// <><> Children
	children?: React.ReactNode
}

export default function DataDisplay(props: DataDisplayProps) {
	// <><><> Dev mode stuff
	const devMode = props.devMode; const toggleDevMode = props.toggleDevMode
	// <><><> What's happening
	const whatsHappening = props.whatsHappening;
	const scoreState = props.scoreState;

	// Icons
	// const isOff = <IconButton aria-label='Search database' id="devModeToggle" icon={<SearchIcon />} onClick={() => toggleDevMode()} />
	// const isOn = <IconButton aria-label="" id="devModeToggle" icon={<EditIcon />} onClick={() => toggleDevMode()} />


	// <><><> Derivative values
	const currentPlayerIndex = whatsHappening.currentPlayerIndex;
	const currentPlayer = scoreState[currentPlayerIndex];


	return (
		<Stack id="devModeBox" w={'100%'}>
			<Stack spacing={8} direction='row' id="specialControls">
				<ColorModeButton />
				<Button id="devModeToggle" onClick={toggleDevMode}>{devMode ? <>{"Development Mode is On"}</> : <>{"Development Mode is Off"}</>}
				</Button>
			</Stack>
			{/* {If devMode is on, then return the text} */}
			{devMode ? (<Box id="devData">
				<h3>Player: {currentPlayer.name}</h3>
				<h3>Phase: {whatsHappening.currentPhase.title}</h3>
				<p>Choosing a category with development mode on will hide the values of the answer choices and will instead display which is the correct choice.</p>
				{props.children}
			</Box>) : null}
		</Stack>)
}