import { LOGIN_USER, LOGOUT_USER } from "../constants/Constants";
/**
 * @description Handle which user who will answer the question 
 * @param {object} state Defined State 
 * @param {object} action Defined action type (LOGIN_USER and LOGOUT_USER )
 */
export default function authedUser(state = null, action) {
    switch(action.type) {
        //action => loginUser(id)
        case LOGIN_USER:
            return action.id;

        //action => logoutUser()
        case LOGOUT_USER:
            return null;
            
        default:
            return state;        
    }
}