import { saveQuestion, saveQuestionAnswer } from "../utils/helper";
import { RECEIVE_QUESTIONS , ANSWER_QUESTION, CREATE_QUESTION } from "../constants/Constants";
import { showLoading, hideLoading } from 'react-redux-loading';


/**
 * @description set all questions into the store
 * ../utils/helper.js  => export function _saveQuestion (question)
 * @param {object} question 
 */
export function recieveQuestions(questions) {
    return {
        type : RECEIVE_QUESTIONS,
        questions
    }
}


/**
 * @description set all questions into the store
 * ../utils/helper.js  => export function _saveQuestionAnswer ({ authedUser, qid, answer }) 
 * @param {string} authedUser the user who answer the question
 * @param {string} qid answer which question
 * @param {string} answer option1 or option2
 */
export function answerQuestion({ authedUser, qid, answer }) {
    return {
        type : ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

/**
 * @description Answer a question on backend side by communicating with API and put into store 
 * ../utils/helper.js  =>  saveQuestionAnswer(info) =>  _saveQuestionAnswer({ authedUser, qid, answer })
 * @param {string} qid answer which question
 * @param {string} answer option1 or option2
 */
export function handleAnswerQuestion({qid, answer}) {
    return (dispatch, getState) => {
        dispatch(showLoading());

        const { authedUser } = getState()

        const questionanswer = { authedUser, qid, answer }

        return saveQuestionAnswer(questionanswer)
            .then(() => dispatch(answerQuestion(questionanswer)))
            .catch((error) => {
                console.warn("Error => handleAnswerQuestion : ", error);
                alert("Error : Adding your question to the database");
            })
            .finally(()=>dispatch(hideLoading()))
    }
}

/**
 * @description add new question into the store
 * ../utils/helper.js  => export function  _saveQuestion(question) 
 * @param {object} question 
 */
function createQuestion(question, authedUser) {
    return {
        type: CREATE_QUESTION,
        question,
        authedUser
    }
}  

/**
 * @description Save an question, and call savequestion api to save the new question, and then update the store with new question 
 * ../utils/helper.js  => formatQuestion({ optionOneText, optionTwoText, author })
 * @param {*} optionOneText 
 * @param {*} optionTwoText 
 */
export function handleCreateQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {

        /** TODO : Get authedUser from combineReducer via getState() */
        const { authedUser } = getState()

        dispatch(showLoading())

        const questionInfo = {
            author: authedUser,
            optionOneText,
            optionTwoText
        }

        return saveQuestion(questionInfo)
            .then((question) => {
                    dispatch(createQuestion(question, authedUser))
                }
            )
            .catch((error) => {
                    console.warn("ERROR => handleCreateQuestion : ", error);
                    alert("ERROR : Adding your question to the database")
                }
            )
            .finally(() => {
                    dispatch(hideLoading());
                }
            );
    }
}