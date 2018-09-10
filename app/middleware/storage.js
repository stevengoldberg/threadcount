import {
  tokenActions,
  profileActions,
  refreshActions,
  SIGN_OUT
} from '../actions/auth';
import { getSuccessType } from '../utils/type-utils';
import { INIT_APP } from '../actions/home';

export default store => next => action => {
  let user;
  const { dispatch } = store;
  let refreshToken;

  switch (action.type) {
    case getSuccessType(tokenActions):
      localStorage.setItem('auth', JSON.stringify(action.payload));
      try {
        user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          next({
            type: getSuccessType(profileActions),
            payload: user
          });
        }
        return next(action);
      } catch (e) {
        return next(action);
      }
    case getSuccessType(refreshActions):
      refreshToken = JSON.parse(localStorage.getItem('auth')).refresh_token;

      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...action.payload,
          refresh_token: refreshToken
        })
      );
      return next(action);
    case getSuccessType(profileActions):
      localStorage.setItem('user', JSON.stringify(action.payload));
      return next(action);
    case INIT_APP:
      try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth) {
          dispatch(
            next({
              type: getSuccessType(tokenActions),
              payload: auth
            })
          );
        } else {
          return next(action);
        }
      } catch (e) {
        return next(action);
      }
      return next(action);
    case SIGN_OUT:
      localStorage.setItem('auth', '');
      localStorage.setItem('user', '');
      return next(action);
    default:
      return next(action);
  }
};
