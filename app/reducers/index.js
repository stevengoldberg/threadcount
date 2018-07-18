// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import auth from './auth';
import user from './user';
import threads from './threads';
import messages from './messages';
import contacts from './contacts';

const rootReducer = combineReducers({
  router,
  auth,
  user,
  threadsByEmail: threads,
  messagesByThreadId: messages,
  contacts
});

export default rootReducer;
