import { Dispatch } from "react";
import { GameAction, category, nullQuestion } from "../gameReducer";
import { getQuestion } from "../helpers/queryTheTrivia";

export const newQuestion = async (category: category, devMode: boolean, dispatch: Dispatch<GameAction>) => {
    // Update the UI
    const categoryTitle = category.title;
    dispatch({ type: "phase_get_question" })
    // Clear the question while we wait for the API to respond

    if (devMode) { dispatch({ type: "phase_answer_question", payload: nullQuestion(category.queryTag) }); }
    else {
        try {
            // Use await within the async function
            const question = await getQuestion(category.queryTag, devMode);
            // Update the game state with the new question
            dispatch({ type: "phase_answer_question", payload: question });
        } catch (error) {
            console.error("Error fetching question:", error);
            // Handle the error appropriately, e.g., show an error message to the user
        }
    }
}