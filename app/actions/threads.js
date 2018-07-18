import { RSAA } from 'redux-api-middleware';
import {
  typeGenerator,
  getRequestType,
  getSuccessType,
  getFailureType
} from '../utils/type-utils';

export const threadActions = typeGenerator('threads');
export const messageActions = typeGenerator('messages');

const GOOGLE_THREADS_URL =
  'https://www.googleapis.com/gmail/v1/users/me/threads';

export function queryThreads(...params) {
  return async dispatch => {
    await dispatch(fetchThreads(...params));
  };
}

function fetchThreads(values, pageToken) {
  const queryString = `from:${values.theirEmail} OR to:${
    values.theirEmail
  } is:chat after:${values.afterDate}`;
  const pageTokenString = pageToken ? `pageToken=${pageToken}&` : '';
  return {
    [RSAA]: {
      endpoint: `${GOOGLE_THREADS_URL}?${pageTokenString}q=${window.encodeURIComponent(
        queryString
      )}`,
      method: 'GET',
      types: [
        getRequestType(threadActions),
        {
          type: getSuccessType(threadActions),
          payload: (action, state, res) =>
            res.json().then(payload => ({
              values,
              threadList: payload.threads
            }))
        },
        getFailureType(threadActions)
      ]
    }
  };
}

export function getThread(id) {
  return {
    [RSAA]: {
      endpoint: `${GOOGLE_THREADS_URL}/${id}`,
      method: 'GET',
      types: messageActions
    }
  };
}
