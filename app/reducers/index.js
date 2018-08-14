// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as tokenRefresh } from 'redux-refresh-token';
import auth from './auth';
import user from './user';
import threads from './threads';
import messages from './messages';
import contacts from './contacts';
import ui from './ui';

const rootReducer = combineReducers({
  data: combineReducers({
    router,
    auth,
    user,
    threadsByEmail: threads,
    messagesByThreadId: messages,
    contacts
  }),
  ui,
  tokenRefresh
});

export default rootReducer;
