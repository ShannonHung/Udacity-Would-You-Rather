import { getInitialData } from "../utils/helper";
import { recieveAllUsers } from "./users";
import { recieveQuestions } from "./question"
import { loginUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = null;

/**
 * @description Initial All Data from API 
 */
export function handleInitialData() {
    return dispatch => {
        dispatch(showLoading())
        return getInitialData().then(({users, questions}) => {
            dispatch(recieveAllUsers(users));
            dispatch(recieveQuestions(questions));
            dispatch(loginUser(AUTHED_ID));
            dispatch(hideLoading())
        });
    }
}