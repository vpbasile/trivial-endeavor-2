/**
 * Renders the game board component.
 * 
 * @returns The game board component.
 */
import { ArrowForwardIcon, QuestionIcon } from "@chakra-ui/icons";
import { Box, Collapse, VStack } from "@chakra-ui/react";
import { useReducer } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import DataDisplay from "../components/DataDisplay";
import gameReducer, { gameStateType, nullQuestion } from "../components/gameReducer";
import DevModeButton from "../components/helpers/DevModeButton";
import { SameButton } from "../components/helpers/SameButton";
import AppRow from "../components/helpers/appRow";
import { categoryList } from "../components/helpers/queryTheTrivia";
import { newBreaks } from "../components/helpers/style";
import QuestionDisplay from "../components/question/QuestionDisplay";
import PlayerColumn from "../components/scoreboard/PlayerColumn";

export default function GameBoard() {

    // Access the parameters from the URL
    const { devModeEntered, playerNames } = useParams();
    let playerNamesArray: string[] = [];
    if (playerNames) playerNamesArray = playerNames.split("-");
    const playerListInit = playerNamesArray.map((name, index) => ({ index, key: index, name, correctCategories: [], wonPlace: 0 }))

    // If devMode is 0, then the game is in normal mode. If devMode is 1, then the game is in developer mode.
    console.log("devModeEntered", devModeEntered);
    const devModeDefault = (devModeEntered === "1");
    console.log("devModeDefault", devModeDefault);

    const initialGameState: gameStateType = {
        currentPhase: "Select",
        currentPlayerIndex: 0,
        playerIndicator: playerListInit[0].name,
        displayMessage: <SameButton text={`Select a question!`} />,
        currentQuestion: nullQuestion(),
        vyingForPlace: 1,
        guessEntered: null,
        playerList: playerListInit,
        askedQuestions: [""],
        devMode: devModeDefault,
        neededToWin: devModeDefault ? 2 : categoryList.length,
    }

    const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
    const { currentPhase, playerList, currentPlayerIndex, playerIndicator, displayMessage } = gameState;

    let icon = undefined;
    if (currentPhase === "Feedback") {
        icon = <ArrowForwardIcon />;
    } else if (currentPhase === "Answer" || currentPhase === "Question") {
        icon = <QuestionIcon />;
    }

    return (<ErrorBoundary fallback={<Box>Error in component AppRow</Box>}>
        <VStack>
            <VStack id="gameflowDisplay" p={3}>
                {displayMessage}
                {<SameButton id="turnTracker"
                    text={playerIndicator}
                    isDisabled={currentPhase !== "Feedback"}
                    leftIcon={icon}
                    rightIcon={icon}
                    onClick={() => dispatch({ type: 'phase_5_next_player' })} />}
            </VStack>
            <VStack id="gameBoardContainer" maxWidth={newBreaks}>
                <Collapse in={currentPhase === "Answer" || currentPhase === "Feedback"} unmountOnExit animateOpacity>
                    <AppRow id="question-row">
                        <QuestionDisplay key={"currentQuestion"} gameState={gameState} dispatch={dispatch} />
                    </AppRow>
                </Collapse>
                <Collapse in={currentPhase === "Select"} unmountOnExit animateOpacity>
                    <Box id="scoreboard" display={{ sm: 'flex' }} scrollBehavior={'smooth'}>
                        {playerList.map((player, index) => (
                            <PlayerColumn key={player.name + '-column'} gameState={gameState} dispatch={dispatch} playerKey={index} isDisabled={index !== currentPlayerIndex} />))
                        }
                    </Box>
                </Collapse>
            </VStack>
            <VStack id="controlRow" >
                < ErrorBoundary fallback={<Box>Error in component DataDisplay</Box>}>
                    <DevModeButton devMode={gameState.devMode} dispatch={dispatch} />
                    <DataDisplay gameState={gameState} />
                </ErrorBoundary>
            </VStack>
        </VStack>
    </ErrorBoundary >)
}