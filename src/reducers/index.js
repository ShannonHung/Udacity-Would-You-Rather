import { combineReducers } from "redux";
import authedUser from "./authedUser";
import questions from "./questions";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading";

/**
 * @description Defines combineReducers to combine all reducers into a creating store
 */
export default combineReducers({
    authedUser,
    questions,
    users,
    loadingBar: loadingBarReducer,
});