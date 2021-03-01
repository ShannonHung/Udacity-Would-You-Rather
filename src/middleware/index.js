import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from './logger';

/**
 * @description combine two middleware: thunk which can know distach function or action, loggine which log state in the store 
 */
export default applyMiddleware(
  thunk,
  logger,
);