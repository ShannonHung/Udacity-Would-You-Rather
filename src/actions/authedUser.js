import { LOGIN_USER,LOGOUT_USER } from "../constants/Constants";

/**
 * @description Loging to the app, set the author id in the store
 * @param {string} id 
 */
export function loginUser(id) {
    return {
        type : LOGIN_USER,
        id,
    }
}

/**
 * @description logout, remove the author fomr authedUser store
 */
export function logoutUser() {
    return{
        type: LOGOUT_USER,
    }
}