import axios from 'axios';

const authMiddleware = store => next => action => {
  const { auth } = store.getState();
  const { meta } = action;
  if (!meta || !meta.requiresAuth || !meta.config) {
    return next(action);
  }
  const configWithAuth = Object.assign({}, action.config, {
    headers: {
      Authorization: `Bearer ${auth.token.access_token}`
    }
  });
  return dispatch => {
    next(dispatch(axios(configWithAuth)));
  };
};

export default authMiddleware;
