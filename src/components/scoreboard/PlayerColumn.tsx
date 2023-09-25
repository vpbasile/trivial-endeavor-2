import { Dispatch } from 'react';
import { category, player, questionInternal, whatsHappeningHolder, winners } from '../helpers/dataStructures';
import { Text, Stack, useColorModeValue } from '@chakra-ui/react';
import CategoryButton from './CategoryButton';
import { sidePad } from '../helpers/style';

type PlayerColumnProps = {
	// <><><> Dev mode stuff
	devMode: boolean;
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder; setwhatsHappening: Dispatch<whatsHappeningHolder>,
	currentQuestion: questionInternal; setCurrentQuestion: Dispatch<questionInternal>;
	scoreState: player[]
	guessedYet: boolean; setguessedYet: Dispatch<boolean>;
	SETdisplayMessage: Dispatch<string>;
	// <><><> Winning
	vyingForPlace: winners;
	// <><><> Game Globals
	categoryList: category[],
	// <><><> Question Globals
	player: player,
	// <><><> Derivative values
}

export default function PlayerColumn(props: PlayerColumnProps) {
	// <><><> Dev mode stuff
	const devMode = props.devMode;
	// <><><> What's happening
	const whatsHappening = props.whatsHappening; const setwhatsHappening = props.setwhatsHappening;
	const currentQuestion = props.currentQuestion; const setCurrentQuestion = props.setCurrentQuestion;
	const scoreState = props.scoreState;
	const guessedYet = props.guessedYet; const setguessedYet = props.setguessedYet;
	const SETdisplayMessage = props.SETdisplayMessage;
	// <><><> Winning
	const vyingForPlace = props.vyingForPlace;
	// <><><> Game Globals
	const categoryList = props.categoryList;
	// <><><> Question Globals
	const player = props.player;
	const playerKey = "player-" + player.index;
	// <><><> Derivative values

	const fgColor = useColorModeValue('black', 'white')

	return (
		<Stack direction='column' id={playerKey + "-column"} flex={1} px={sidePad} borderY={`2px solid ${fgColor}`} py={3} my={3}>
			<Text colorScheme='gray' >{player.name}</Text>
			{categoryList.map(category => {
				if (category.queryTag !== "none") {
					return (
						<CategoryButton
							key={category.key}
							// <><><> Dev mode stuff
							devMode={devMode}
							// <><><> What's happening
							whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
							currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
							scoreState={scoreState}
							guessedYet={guessedYet} setguessedYet={setguessedYet}
							SETdisplayMessage={SETdisplayMessage}
							// <><><> Winning
							vyingForPlace={vyingForPlace}
							// <><><> Game Globals
							categoryList={categoryList}
							// <><><> Question Globals
							// <><><> Player and category we're iterating on 
							category={category}
							player={player}
						/>
					);
				} else { return null; }
			}
			)}
		</Stack>
	)
}

