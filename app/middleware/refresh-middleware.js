import { isRSAA, apiMiddleware } from 'redux-api-middleware';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { attemptTokenRefresh, refreshActions } from '../actions/auth';
import { getSuccessType } from '../utils/type-utils';

/*
 * Credit to Mikhail Podgurskiy
 * github.com/kmmbvnr
 * https://bit.ly/2Qi8TEw 
 */

function createRefreshMiddleware() {
  let postponedRSAAs = [];
  return ({ dispatch, getState }) => {
    const rsaaMiddleware = apiMiddleware({ dispatch, getState });
    return next => action => {
      const nextCheckPostoned = nextAction => {
        // Run postponed actions after token refresh
        if (nextAction.type === getSuccessType(refreshActions)) {
          next(nextAction);
          postponedRSAAs.forEach(postponed => {
            rsaaMiddleware(next)(postponed);
          });
          postponedRSAAs = [];
        } else {
          next(nextAction);
        }
      };

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
              const newAction = attemptTokenRefresh(refreshToken);
              return rsaaMiddleware(nextCheckPostoned)(newAction);
            }
            return;
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
