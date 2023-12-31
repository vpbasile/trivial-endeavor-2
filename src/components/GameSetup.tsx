import { AddIcon, CheckIcon, MinusIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Box, Button, Center, List, ListIcon, ListItem, Stack, Text } from '@chakra-ui/react';
import { propsType } from './gameReducer';

export default function GameSetup(props: propsType) {
	const { gameState, dispatch } = props;
	const playerList = gameState.playerList;

	// const namefields = playerList.map(player => {
	// 	return (
	// 		<ListItem key={player.name + "namefield"}>
	// 			<ListIcon as={QuestionOutlineIcon} />
	// 			<label htmlFor={player.name + "name"}>{player.name}</label>
	// 			{/* <input type="text" id={player.name + "name"} placeholder={player.name} onChange={(e) => { console.log(`${player.index}. ${e.target.value}`); />*/}
	// 		</ListItem>
	// 	);

	// });

	const namefields = playerList.map(player => {
		return (
			<ListItem key={player.name + "namefield"}>
				<ListIcon as={QuestionOutlineIcon} />
				<label htmlFor={player.name + "name"}>{player.name}</label>
				{/* <input type="text" id={player.name + "name"} placeholder={player.name} onChange={(e) => { console.log(`${player.index}. ${e.target.value}`); />*/}
			</ListItem>
		);
	});

	{/* If namefields is shorter than four items, add empty list items to fill the space. This will eliminate moving the footer */ }
	for (let i = playerList.length; i < 4; i++) {
		namefields.push(<ListItem key={i + "namefield"}><ListIcon as={QuestionOutlineIcon} /></ListItem>);
	}

	const playerCount = playerList.length
	const rosterMaxed: boolean = playerCount < 4
	const rosterMinnd: boolean = playerList.length === 1;

	const addTeam = () => dispatch({ type: 'add_player', payload: playerCount + 1 });
	const removeTeam = () => dispatch({ type: 'remove_player', payload: playerCount - 1 });

	const addButton =
		<Button
			leftIcon={<AddIcon />}
			textAlign={'left'}
			isDisabled={!rosterMaxed}
			onClick={addTeam}> Add another team</Button>

	const removeButton =
		<Button
			leftIcon={<MinusIcon />}
			textAlign={'left'}
			isDisabled={rosterMinnd}
			onClick={removeTeam}>Remove a team</Button>

	const startButton =
		<Button
			textAlign={'left'}
			leftIcon={<CheckIcon color={'green'} />}
			onClick={() => { dispatch({ type: 'phase_begin_game' }) }}>Begin Game</Button>

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



				</Box>
			</Center>
		</Box>)
}