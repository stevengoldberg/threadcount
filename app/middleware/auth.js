import { RSAA } from 'redux-api-middleware';
import isNil from 'lodash/isNil';
import get from 'lodash/get';

// eslint-disable-next-line no-unused-vars
export default store => next => action => {
  const callApi = action[RSAA];
  let accessToken;

  // Check if this action is a redux-api-middleware action.
  if (callApi) {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (auth) {
        const { token_type: tokenType } = auth;
        accessToken = auth.access_token;
        // Inject the Authorization header from localStorage.
        callApi.headers = Object.assign({}, callApi.headers, {
          Authorization: `${tokenType} ${accessToken}` || ''
        });
        if (isNil(get(callApi.headers, 'Content-Type', null))) {
          callApi.headers['Content-Type'] = 'application/json';
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Pass the FSA to the next action.
  return next(action);
};
