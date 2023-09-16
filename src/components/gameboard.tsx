import { Box, Center, Heading, List, ListItem } from "@chakra-ui/react"
import { ErrorBoundary } from "react-error-boundary";
import GameSetup from "./GameSetup";
import { neededToWin, categoryList, gamePhases, players } from "./helpers/settings";
import Question from "./question/QuestionDisplay";
import { useState } from "react";
import { player, questionInternal, whatsHappeningHolder, winners } from "./helpers/dataStructures";
import AppRow from "./structure/appRow";
import PlayerColumn from "./scoreboard/PlayerColumn";
import DataDisplay from "./DataDisplay";

export type zzColor = string

export default function GameBoard() {


    const [displayMessage, SETdisplayMessage] = useState("Welcome! How many players?")
    // const [messageColor, SETmessageColor] = useState<zzColor>("blue")
    // <><><> What's happening
    const [whatsHappening, setwhatsHappening] = useState<whatsHappeningHolder>({ currentPhase: gamePhases[0], currentPlayerIndex: 0 });
    const blankQuestion: questionInternal = { questionText: null, choices: ["", "", "", ""], correctAnswer: null, correctIndex: 0, categoryTag: categoryList[0].queryTag, guessEntered: 0 };
    const [currentQuestion, setCurrentQuestion] = useState<questionInternal>(blankQuestion);
    // <><><> Winning
    const [vyingForPlace, SETvyingForPlace] = useState<winners>(1);
    // <> Create the states for the game
    const [guessedYet, setguessedYet] = useState(false);
    const [scoreState, setScoreState] = useState<player[]>(players);

    // <><><> Dev mode stuff
    const [devMode, setDevMode] = useState(false);
    function toggleDevMode() {
        // console.log("devMode", devMode)
        setDevMode(!devMode)
        devMode ? console.log("Dev mode is now off") : console.log("Dev mode is now on")
    }

    // FIXME - Centralize where I control which components are displayed.
    function whatToDisplay(phaseTitle: string) {
        switch (phaseTitle) {
            case "Welcome": {
                return (<AppRow id="setup">
                    <GameSetup
                        // <><><> What's happening
                        whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
                        scoreState={scoreState} setScoreState={setScoreState}
                        displayMessage="Welcome!" SETdisplayMessage={SETdisplayMessage}
                        // <><><> Game Globals
                        phases={gamePhases}
                    />
                </AppRow>); break;
            }
            case "Select": {
                return (<Box id="scoreboard">
                    <Center>
                        {scoreState.map((player) => (
                            <PlayerColumn
                                key={player.name + "playerColumn"}
                                player={player}
                                categoryList={categoryList}
                                scoreState={scoreState}
                                phases={gamePhases}
                                whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
                                displayMessage={displayMessage} SETdisplayMessage={SETdisplayMessage}
                                vyingForPlace={vyingForPlace}
                                currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
                                guessedYet={guessedYet} setguessedYet={setguessedYet}
                                devMode={devMode} />))
                        }
                    </Center>
                </Box>)
                break;
            }
            case "End": { break; }
            default: {
                return (<AppRow id="question">
                    <Question key={"currentQuestion"}
                        // <><><> Dev mode stuff
                        devMode={devMode}
                        neededToWin={neededToWin(devMode)}
                        // <><><> What's happening
                        whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
                        currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
                        questionCategoryTag={currentQuestion.categoryTag}
                        scoreState={scoreState} setScoreState={setScoreState}
                        guessedYet={guessedYet} setguessedYet={setguessedYet}
                        displayMessage={displayMessage} SETdisplayMessage={SETdisplayMessage}
                        // <><><> Winning
                        vyingForPlace={vyingForPlace} SETvyingForPlace={SETvyingForPlace}
                        // <><><> Game Globals
                        categoryList={categoryList}
                        phases={gamePhases}
                    />
                </AppRow>)
                break;
            }
                break;
        }
    }

    return (<ErrorBoundary fallback={<Box>Error in component</Box>}>

        <Box my={8} p={4} bg={'gray.500'} rounded={'xl'}>
            {/* <Button as={'h2'} colorScheme="red">{displayMessage}</Button> */}
            <Heading id='displayMessage' as='h2'>{displayMessage}</Heading>
        </Box>
        {whatToDisplay(whatsHappening.currentPhase.title)}
        {<Center id="controls" >
            < ErrorBoundary fallback={<Box>Error in component</Box>}>
                <DataDisplay
                    players={players}
                    scoreState={scoreState}
                    whatsHappening={whatsHappening}
                    devMode={devMode} toggleDevMode={toggleDevMode}
                >
                    <List>
                        <ListItem>'Needed to win' is set to 2 when in dev mode</ListItem>
                        <ListItem>Vying for place: {vyingForPlace}</ListItem>
                    </List>
                </DataDisplay>
            </ErrorBoundary>

        </Center>}
    </ErrorBoundary >)
}