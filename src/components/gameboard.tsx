/**
 * Renders the game board component.
 * 
 * @returns The game board component.
 */
import { Box, Collapse } from "@chakra-ui/react";
import { useReducer } from "react";
import { ErrorBoundary } from "react-error-boundary";
import DataDisplay from "./DataDisplay";
import GameSetup from "./GameSetup";
import gameReducer, { initialGameState } from "./gameReducer";
import AppRow from "./helpers/appRow";
import { newBreaks } from "./helpers/style";
import QuestionDisplay from "./question/QuestionDisplay";
import PlayerColumn from "./scoreboard/PlayerColumn";

export default function GameBoard() {

    const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
    const { currentPhase, playerList, currentPlayerIndex, displayMessage } = gameState;

    return (<ErrorBoundary fallback={<Box>Error in component AppRow</Box>}>
        <AppRow id="displayMessage">
            {displayMessage}
        </AppRow>
        <Box id="gameBoardContainer" maxWidth={newBreaks}>
            <Collapse in={currentPhase === "Welcome"} unmountOnExit animateOpacity>
                <Box id="setup">
                    <GameSetup gameState={gameState} dispatch={dispatch} />
                </Box>
            </Collapse>
            <Collapse in={currentPhase === "Answer" || currentPhase === "Feedback"} unmountOnExit animateOpacity>
                <AppRow id="question-row">
                    <QuestionDisplay key={"currentQuestion"} gameState={gameState} dispatch={dispatch} />
                </AppRow>
            </Collapse>
            <Collapse in={currentPhase === "Select"} unmountOnExit animateOpacity>
                <Box id="scoreboard" display={{ sm: 'flex' }} scrollBehavior={'smooth'}>
                    {playerList.map((player,index) => (
                        <PlayerColumn key={player.name + '-column'} gameState={gameState} dispatch={dispatch} playerKey={index} isDisabled={index!==currentPlayerIndex} />))
                    }
                </Box>
            </Collapse>
        </Box>
        <AppRow id="controlRow" >
            < ErrorBoundary fallback={<Box>Error in component DataDisplay</Box>}>
                <DataDisplay gameState={gameState} dispatch={dispatch} />
            </ErrorBoundary>

        </AppRow>
    </ErrorBoundary >)
}