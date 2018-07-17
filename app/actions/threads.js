import { RSAA } from 'redux-api-middleware';
import {
  typeGenerator,
  getRequestType,
  getSuccessType,
  getFailureType
} from '../utils/type-utils';

export const threadActions = typeGenerator('threads');

const GOOGLE_THREADS_URL =
  'https://www.googleapis.com/gmail/v1/users/me/threads';

export function queryThreads(values, pageToken) {
  const queryString = `from:${values.theirEmail} OR ${
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
              ...payload,
              values
            }))
        },
        getFailureType(threadActions)
      ]
    }
  };
}
