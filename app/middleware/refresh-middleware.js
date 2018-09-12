import { isRSAA, apiMiddleware } from 'redux-api-middleware';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { attemptTokenRefresh } from '../actions/auth';

/*
 * Inspired by Mikhail Podgurskiy
 * github.com/kmmbvnr
 * https://bit.ly/2Qi8TEw 
 */

function createRefreshMiddleware() {
  const postponedRSAAs = [];
  return ({ dispatch, getState }) => {
    const rsaaMiddleware = apiMiddleware({ dispatch, getState });
    return next => action => {
      if (isRSAA(action)) {
        try {
          const auth = JSON.parse(localStorage.getItem('auth'));
          const { refresh_token: refreshToken } = auth;
          const expirationTime = jwtDecode(auth.id_token).exp * 1000;
          const isAccessTokenExpiring =
            moment(expirationTime) - moment() < 300000;

          if (refreshToken && isAccessTokenExpiring) {
            postponedRSAAs.push(action);
            if (postponedRSAAs.length === 1) {
              return rsaaMiddleware(next)(
                dispatch(() => attemptTokenRefresh(refreshToken))
              ).then(() => {
                const postponedRSAA = postponedRSAAs.pop();
                return dispatch(postponedRSAA);
              });
            }
            return rsaaMiddleware(next)(action);
          }
          return rsaaMiddleware(next)(action);
        } catch (e) {
          console.log(e);
          return next(action);
        }
      }
      return next(action);
    };
  };
}

export default createRefreshMiddleware();
