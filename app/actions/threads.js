import { RSAA } from 'redux-api-middleware';
import get from 'lodash/get';
import {
  typeGenerator,
  getRequestType,
  getSuccessType,
  getFailureType
} from '../utils/type-utils';
import validateQuery from '../utils/validate-query';

export const threadActions = typeGenerator('threads');
export const messageActions = typeGenerator('messages');
export const ALL_MESSAGES_SUCCESS = 'all_messages/SUCCESS';
export const INVALID_QUERY = 'INVALID_QUERY';

const GOOGLE_THREADS_URL =
  'https://www.googleapis.com/gmail/v1/users/me/threads';

export function queryThreads(values, nextPageToken, threadList = []) {
  return async (dispatch, getState) => {
    const validationError = validateQuery(values);
    if (!validationError) {
      const threads = await dispatch(fetchThreads(values, nextPageToken));
      const newPageToken = threads.payload.nextPageToken;
      const newThreadList = threadList.concat(threads.payload.threadList);
      if (newPageToken) {
        return dispatch(queryThreads(values, newPageToken, newThreadList));
      }
      await dispatch({
        type: getSuccessType(threadActions),
        payload: {
          threadList: newThreadList,
          email: values.email,
          selectedStartDate: values.startDate,
          selectedEndDate: values.endDate
        }
      });
      await Promise.all(
        newThreadList.map(thread =>
          dispatch(
            getThread(thread.id, values.email, getState().data.user.email)
          )
        )
      );
      await dispatch({
        type: ALL_MESSAGES_SUCCESS,
        payload: values.email
      });
    } else {
      dispatch({
        type: 'INVALID_QUERY',
        payload: validationError
      });
    }
  };
}

function fetchThreads(values, pageToken) {
  const queryString = `from:${values.email} OR to:${
    values.email
  } after:${values.startDate.format(
    'YYYY/MM/DD'
  )} before:${values.endDate.format('YYYY/MM/DD')}`;
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
          type: 'RECEIVE_THREADS',
          payload: (action, state, res) =>
            res.json().then(payload => ({
              values,
              threadList: get(payload, 'threads', []),
              nextPageToken: payload.nextPageToken
            }))
        },
        getFailureType(threadActions)
      ]
    }
  };
}

export function getThread(id, theirEmail, myEmail) {
  return {
    [RSAA]: {
      endpoint: `${GOOGLE_THREADS_URL}/${id}`,
      method: 'GET',
      types: [
        {
          type: getRequestType(messageActions),
          payload: id
        },
        {
          type: getSuccessType(messageActions),
          payload: (action, state, res) =>
            res.json().then(payload => ({
              ...payload,
              theirEmail,
              myEmail
            }))
        },
        getFailureType(messageActions)
      ]
    }
  };
}
