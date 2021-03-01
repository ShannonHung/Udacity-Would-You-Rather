import { RECEIVE_ALL_USERS } from "../constants/Constants";

/**
 * @description Get all users into store from the api
 * @param {object} users  
 */
export function recieveAllUsers(users) {
    return {
      type: RECEIVE_ALL_USERS,
      users,
    }
  };