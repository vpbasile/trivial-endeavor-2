import { Box, Heading, useColorModeValue } from "@chakra-ui/react"
import { ErrorBoundary } from "react-error-boundary";
import GameSetup from "./GameSetup";
import { neededToWin, categoryList, gamePhases, players } from "./helpers/settings";
import Question from "./question/QuestionDisplay";
import { useState } from "react";
import { player, questionInternal, whatsHappeningHolder, winners } from "./helpers/dataStructures";
import AppRow from "./helpers/appRow";
import PlayerColumn from "./scoreboard/PlayerColumn";
import DataDisplay from "./DataDisplay";

export type zzColor = string

export default function GameBoard() {

    const [displayMessage, SETdisplayMessage] = useState("Welcome! You can play with up to 4 teams.")
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

    const bgColor = useColorModeValue('white', 'black')

    // FIXME - Centralize where I control which components are displayed.
    function whatToDisplay(phaseTitle: string) {
        switch (phaseTitle) {
            case "Welcome": {
                return (<Box id="setup">
                    <GameSetup
                        // <><><> What's happening
                        whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
                        scoreState={scoreState} setScoreState={setScoreState}
                        displayMessage="Welcome!" SETdisplayMessage={SETdisplayMessage}
                        // <><><> Game Globals
                        phases={gamePhases}
                    />
                </Box>); break;
            }
            case "Select": {
                return (<Box id="scoreboard" display={{ sm: 'flex' }} scrollBehavior={'smooth'}>
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
            }
                break;
        }
    }

    return (<ErrorBoundary fallback={<Box>Error in component</Box>}>
        <AppRow id="displayMessage">
            <Box textAlign={'center'} id="messageDisplay" w={'100%'} bg={bgColor}
                my={5}
                p={8}
                borderRadius={'lg'}>
                <Heading id='displayMessage' as='h2' whiteSpace={'normal'}>{displayMessage}</Heading>
            </Box>
        </AppRow>
        <Box id="gameBoardContainer">
            {whatToDisplay(whatsHappening.currentPhase.title)}
        </Box>
        <AppRow id="controlRow" >
            < ErrorBoundary fallback={<Box>Error in component</Box>}>
                <DataDisplay
                    players={players}
                    scoreState={scoreState}
                    whatsHappening={whatsHappening}
                    devMode={devMode} toggleDevMode={toggleDevMode}
                    vyingForPlace={vyingForPlace}
                />
            </ErrorBoundary>

        </AppRow>
    </ErrorBoundary >)
}