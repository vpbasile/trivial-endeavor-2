import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, Center, HStack, List, ListItem, Stack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import ColorModeButton from '../helpers/ColorModeButton';
import { SameBanner } from '../helpers/SameBanner';

import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';


export default function GameSetup() {
	const [numberOfPlayers, SETnumberOfPlayers] = useState(3)

	const [player1temp, setPlayer1temp] = useState("Vincent")
	const [player2temp, setPlayer2temp] = useState("Park")
	const [player3temp, setPlayer3temp] = useState("Valerie")
	const [player4temp, setPlayer4temp] = useState("Rick")
	// Display that many input fields for player names
	const player1input = <ListItem key={1 + "namefield"}><input type="text" value={player1temp} onChange={(e) => setPlayer1temp(e.target.value)} /></ListItem>
	const player2input = <ListItem key={2 + "namefield"}><input type="text" value={player2temp} onChange={(e) => setPlayer2temp(e.target.value)} /></ListItem>
	const player3input = <ListItem key={3 + "namefield"}><input type="text" value={player3temp} onChange={(e) => setPlayer3temp(e.target.value)} /></ListItem>
	const player4input = <ListItem key={4 + "namefield"}><input type="text" value={player4temp} onChange={(e) => setPlayer4temp(e.target.value)} /></ListItem>

	const playerInputs = [player1input, player2input, player3input, player4input]
	const playerList = [player1temp, player2temp, player3temp, player4temp]

	const playerCount = numberOfPlayers
	const rosterMaxed: boolean = playerCount < 4
	const rosterMinnd: boolean = playerList.length === 1;

	const addTeam = () => { const x = numberOfPlayers + 1; SETnumberOfPlayers(x) }
	const removeTeam = () => { const x = numberOfPlayers - 1; SETnumberOfPlayers(x) }

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

	// Create a URL to pass the player names to the game page
	const URL = '/trivial-endeavor-2/' + encodeURI((playerList.slice(0, numberOfPlayers)).join('-'));

	const startButton = <Button>
		<ChakraLink as={ReactRouterLink} to={URL}
			textAlign={'left'}
		// leftIcon={<CheckIcon color={'green'} />}
		>Begin Game</ChakraLink>
	</Button>

	return (
		<VStack id='gameSetupForm'>
			<SameBanner text={"Welcome! You can play with up to 4 teams."} />
			<HStack id='formBody' flex={5} p={8}>
				<Stack id='addRemovePlayers' flex={5} p={8}>
					{addButton}
					{startButton}
					{removeButton}
					<ColorModeButton />
				</Stack>
				<Center id="playerList" flex={5}>
					<Box w={'fit-content'} py={8}>
						<Text>Teams/Players</Text>
						<List>{
							// I want to display a number of inputs equal to the number of players that the user has selected.
							playerInputs.slice(0, numberOfPlayers)
						}</List>



					</Box>
				</Center>
			</HStack>
		</VStack>)
}