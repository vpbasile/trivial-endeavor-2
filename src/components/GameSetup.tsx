import { AddIcon, CheckIcon, MinusIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Heading, List, ListIcon, ListItem, Stack, Text } from '@chakra-ui/react';
import { Dispatch } from 'react';
import { player, whatsHappeningHolder } from './helpers/dataStructures';
import { namesToUse, players } from './helpers/settings';

// FIXME are all the propsTypes similar? Should they be standardized or customized?

type propsType = {
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder;
	setwhatsHappening: Dispatch<whatsHappeningHolder>;
	scoreState: player[];
	setScoreState: Dispatch<player[]>;
	SETdisplayMessage: Dispatch<JSX.Element>;
};

export default function GameSetup(props: propsType) {
	const whatsHappening = props.whatsHappening;
	const setwhatsHappening = props.setwhatsHappening;
	const scoreState = props.scoreState;
	const currentPlayerIndex = whatsHappening.currentPlayerIndex;
	const setScoreState = props.setScoreState;
	const SETdisplayMessage = props.SETdisplayMessage;

	const namefields = scoreState.map(player => {
		return (
			<ListItem key={player.name + "namefield"}>
				<ListIcon as={QuestionOutlineIcon} />
				<label htmlFor={player.name + "name"}>{player.name}</label>
				{/* <input type="text" id={player.name + "name"} placeholder={player.name} onChange={(e) => { console.log(`${player.index}. ${e.target.value}`); />*/}
			</ListItem>
		);

	});

	const playerCount = scoreState.length
	const rosterMaxed: boolean = playerCount < 4
	const rosterMinnd: boolean = scoreState.length === 1;

	const addButton =
		<Button
			leftIcon={<AddIcon />}
			textAlign={'left'}
			isDisabled={!rosterMaxed}
			onClick={() => setScoreState(
				// Add another player to the scoreState array
				[...scoreState, {
					index: scoreState.length, key: scoreState.length, name: namesToUse[scoreState.length],
					correctCategories: [], wonPlace: 0
				}]
			)}> Add another team</Button>

	const removeButton =
		<Button
			leftIcon={<MinusIcon />}
			textAlign={'left'}
			isDisabled={rosterMinnd}
			onClick={() => setScoreState(
				// Remove the last player from the scoreState array
				scoreState.slice(0, scoreState.length - 1)
			)}>Remove a team</Button>

	const startButton =
		<Button
			textAlign={'left'}
			leftIcon={<CheckIcon color={'green'} />}
			onClick={() => {
				console.log("Begin game");
				setwhatsHappening({
					// FIXTHIS Neet to make this safer
					currentPhase: "Select",
					currentPlayerIndex: currentPlayerIndex
				});
				const currentPlayer = players[whatsHappening.currentPlayerIndex];
				SETdisplayMessage(<Heading id='displayMessage' as='h2' whiteSpace={'normal'}>{`Select a category, ${currentPlayer.name}`}</Heading>)
					
			}}>Begin Game</Button>


	return (
		<Box display={{ sm: 'flex' }}>
			<Stack id='addRemovePlayers' flex={5} p={8}>
				{addButton}
				{startButton}
				{removeButton}
			</Stack>
			<Center id="playerList" flex={5}>
				<Box w={'fit-content'} py={8}>
					<Text>Teams/Players</Text>
					<List>{namefields}</List>
					{/* Make it so the list always has four lines.  This will eliminate moving the footer */}
				</Box>
			</Center>
		</Box>)
}