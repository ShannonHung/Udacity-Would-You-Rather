import { RECEIVE_QUESTIONS, ANSWER_QUESTION, CREATE_QUESTION } from "../constants/Constants";


/**
 * @description Handle questions process in terms of action type
 * @param {object} state Defined State 
 * @param {object} action Defined action type (RECEIVE_QUESTIONS , ANSWER_QUESTION and CREATE_QUESTION )
 */
export default function questions(state = null, action) {
    switch(action.type) {
        // action => recieveQuestions(question)
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
              };

        // action => answerQuestion({ authedUser, qid, answer })
        case ANSWER_QUESTION:
            return {
                ...state, //original questions {}
                [action.qid]: { //set qid questions => 'qid': {}
                  ...state[action.qid], //find questions by qid =>  {id: qid, author:..., timestamp:....., option1: ..., option2: ...}
                  [action.answer]: {  // {option1: '' }
                    ...state[action.qid][action.answer], //origin option1 => {}
                    votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                  }
                }
              }

        
        // action => createQuestion(question)
        case CREATE_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
              };    
        
              
        default:
            return state;        
    }
}