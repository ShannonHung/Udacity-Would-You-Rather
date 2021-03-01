import { RECEIVE_ALL_USERS } from "../constants/Constants";
import { ANSWER_QUESTION, CREATE_QUESTION } from "../constants/Constants";

/**
 * @description Handle user process in terms of action type
 * @param {object} state Defined State 
 * @param {object} action Defined action type (RECEIVE_USERS , ANSWER_QUESTION and CREATE_QUESTION )
 */
export default function users(state = {}, action) {
    switch(action.type) {
        // action => recieveAllUsers(users) 
        case RECEIVE_ALL_USERS:
            return {
                ...state,
                ...action.users,
              };

        // action => answerQuestion({ authedUser, qid, answer })
        case ANSWER_QUESTION:
            
            //_Data.js => _saveQuestionAnswer({ authedUser, qid, answer }) => users part
            return {
                ...state,
                [action.authedUser]: { //[shannon]
                  ...state[action.authedUser], //{name:..., avatar:..., answers: ...}
                  answers: { //update answer: 
                    ...state[action.authedUser].answers, // {answers: {'id-123': 'opt1', 'id-234':'opt2}}
                    [action.qid]: action.answer  //add new answer => 'new-id':'answer'
                  }
                }
              }

        //  action => createQuestion(question)
        case CREATE_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                  ...state[action.authedUser],
                  questions: state[action.authedUser].questions.concat([action.id])
                }
              }

    
        default:
            return state;            
    }
}