import { Dispatch } from 'react';
import { category, phaseDefinition, player, questionInternal, whatsHappeningHolder, winners } from '../helpers/dataStructures';
import { Text, Stack } from '@chakra-ui/react';
import CategoryButton from './CategoryButton';

type PlayerColumnProps = {
	// <><><> Dev mode stuff
	devMode: boolean;
	// <><><> What's happening
	whatsHappening: whatsHappeningHolder; setwhatsHappening: Dispatch<whatsHappeningHolder>,
	currentQuestion: questionInternal; setCurrentQuestion: Dispatch<questionInternal>;
	scoreState: player[]
	guessedYet: boolean; setguessedYet: Dispatch<boolean>;
	displayMessage: string; SETdisplayMessage: Dispatch<string>;
	// <><><> Winning
	vyingForPlace: winners;
	// <><><> Game Globals
	categoryList: category[],
	phases: phaseDefinition[],
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
	const displayMessage = props.displayMessage; const SETdisplayMessage = props.SETdisplayMessage;
	// <><><> Winning
	const vyingForPlace = props.vyingForPlace;
	// <><><> Game Globals
	const categoryList = props.categoryList;
	const phases = props.phases;
	// <><><> Question Globals
	const player = props.player;
	const playerKey = "player-" + player.index;
	// <><><> Derivative values

	return (
		<Stack direction='column' id={playerKey + "-column"} p="2%" >
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
							displayMessage={displayMessage} SETdisplayMessage={SETdisplayMessage}
							// <><><> Winning
							vyingForPlace={vyingForPlace}
							// <><><> Game Globals
							categoryList={categoryList}
							phases={phases}
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

