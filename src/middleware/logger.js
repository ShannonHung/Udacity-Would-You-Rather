/**
 * @description Implementing logging results for each action
 * @param {object} store taken from logger as the argument and returns another function.
 * @param {object} next next from store as the argument and returns another function.
 * @param {object} action action taken as the argument 
 */
const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log("The action: ", action);
    const returnValue = next(action);
    console.log("The new state: ", store.getState());
    console.groupEnd();
    return returnValue;
};

export default logger;