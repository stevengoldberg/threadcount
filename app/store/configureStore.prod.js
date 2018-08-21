// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import authMiddleware from '../middleware/auth';
import storageMiddleware from '../middleware/storage';
import contactsMiddleware from '../middleware/contacts';

const history = createHashHistory();
const router = routerMiddleware(history);

function configureStore(initialState) {
  const middleware = [];
  const enhancers = [];
  middleware.push(
    thunk,
    authMiddleware,
    apiMiddleware,
    storageMiddleware,
    contactsMiddleware,
    router
  );
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = compose(...enhancers);
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
