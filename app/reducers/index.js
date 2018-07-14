// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
  router,
  auth,
  user
});

export default rootReducer;
