import { Box, Collapse, Heading } from "@chakra-ui/react"
import { ErrorBoundary } from "react-error-boundary";
import GameSetup from "./GameSetup";
import { neededToWin, categoryList, players } from "./helpers/settings";
import QuestionDisplay from "./question/QuestionDisplay";
import { useState } from "react";
import { guessType, player, questionInternal, whatsHappeningHolder, winners } from "./helpers/dataStructures";
import AppRow from "./helpers/appRow";
import PlayerColumn from "./scoreboard/PlayerColumn";
import DataDisplay from "./DataDisplay";

export type zzColor = string

export default function GameBoard() {

    const [displayMessage, SETdisplayMessage] = useState("Welcome! You can play with up to 4 teams.")
    // <><><> What's happening
    const [whatsHappening, setwhatsHappening] = useState<whatsHappeningHolder>({ currentPhase: "Welcome", currentPlayerIndex: 0 });
    const blankQuestion: questionInternal = { questionText: null, choices: ["", "", "", ""], correctAnswer: null, correctIndex: 0, categoryTag: categoryList[0].queryTag };
    const [currentQuestion, setCurrentQuestion] = useState<questionInternal>(blankQuestion);
    // <><><> Winning
    const [vyingForPlace, SETvyingForPlace] = useState<winners>(1);
    // <> Create the states for the game
    const [guessedYet, setguessedYet] = useState(false);


    const [guessEntered, SETguessEntered] = useState<guessType>(null);
    const [scoreState, setScoreState] = useState<player[]>(players);

    // <><><> Dev mode stuff
    const [devMode, setDevMode] = useState(false);
    function toggleDevMode() {
        // console.log("devMode", devMode)
        setDevMode(!devMode)
        devMode ? console.log("Dev mode is now off") : console.log("Dev mode is now on")
    }

    // const bgColor = useColorModeValue('white', 'black')

    const currentPhase = whatsHappening.currentPhase;
    return (<ErrorBoundary fallback={<Box>Error in component</Box>}>
        <AppRow id="displayMessage">
            <Box textAlign={'center'} id="messageDisplay" w={'100%'}
                p={10}
                borderRadius={'lg'}>
                <Heading id='displayMessage' as='h2' whiteSpace={'normal'}>{displayMessage}</Heading>
            </Box>
        </AppRow>
        <Box id="gameBoardContainer">
            <Collapse in={currentPhase === "Welcome"}  unmountOnExit animateOpacity>
                <Box id="setup">
                    <GameSetup
                        // <><><> What's happening
                        whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
                        scoreState={scoreState} setScoreState={setScoreState}
                        SETdisplayMessage={SETdisplayMessage}
                    />
                </Box>
            </Collapse>
            <Collapse in={currentPhase === "Answer"} unmountOnExit animateOpacity>
                <AppRow id="question">
                    <QuestionDisplay key={"currentQuestion"}
                        // <><><> Dev mode stuff
                        devMode={devMode}
                        neededToWin={neededToWin(devMode)}
                        // <><><> What's happening
                        whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
                        currentQuestion={currentQuestion}
                        questionCategoryTag={currentQuestion.categoryTag}
                        scoreState={scoreState} setScoreState={setScoreState}
                        guessedYet={guessedYet} setguessedYet={setguessedYet}
                        guessEntered={guessEntered} SETguessEntered={SETguessEntered}
                        SETdisplayMessage={SETdisplayMessage}
                        // <><><> Winning
                        vyingForPlace={vyingForPlace} SETvyingForPlace={SETvyingForPlace}
                        // <><><> Game Globals
                        categoryList={categoryList}
                    />
                </AppRow>
            </Collapse>
            <Collapse  in={currentPhase === "Select"}  unmountOnExit animateOpacity>
                <Box id="scoreboard" display={{ sm: 'flex' }} scrollBehavior={'smooth'}>
                    {scoreState.map((player) => (
                        <PlayerColumn
                            key={player.name + "playerColumn"}
                            player={player}
                            categoryList={categoryList}
                            scoreState={scoreState}
                            whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
                            SETdisplayMessage={SETdisplayMessage}
                            vyingForPlace={vyingForPlace}
                            currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
                            guessedYet={guessedYet} setguessedYet={setguessedYet}
                            devMode={devMode}
                            show={player.index === whatsHappening.currentPlayerIndex}
                        />))
                    }
                </Box>
            </Collapse>
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