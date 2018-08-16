import { isRSAA, RSAA } from 'redux-api-middleware';
import get from 'lodash/get';
import attemptRefresh from 'redux-refresh-token';
import { attemptTokenRefresh, signOut } from '../actions/auth';

export default store => next => action => {
  if (!isRSAA(action)) {
    return next(action);
  }

  const token = get(store.getState(), 'data.auth.accessToken');
  const refreshToken = get(store.getState(), 'data.auth.refreshToken');

  return next(action).then(
    attemptRefresh({
      action,
      failure: signOut,
      isRefreshCall: (newAction, refreshAction) =>
        newAction[RSAA].types[0] === refreshAction[RSAA].types[0],
      next,
      refreshActionCreator: () => attemptTokenRefresh(refreshToken),
      // setAccessTokenActionCreator: payload => ({
      //   type: getSuccessType(tokenActions),
      //   payload
      // }),
      store,
      token
    })
  );
};
