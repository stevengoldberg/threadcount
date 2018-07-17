// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import auth from './auth';
import user from './user';
import threads from './threads';

const rootReducer = combineReducers({
  router,
  auth,
  user,
  threads
});

export default rootReducer;
