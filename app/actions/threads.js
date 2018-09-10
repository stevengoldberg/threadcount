import { ipcRenderer } from 'electron';
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
export const messageDetailActions = typeGenerator('messageDetail');
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
      const userEmail = getState().data.user.email;
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
            getThread({
              id: thread.id,
              selectedEmail: values.email,
              userEmail
            })
          )
        )
      );
      await dispatch(
        allMessagesSuccess({ selectedEmail: values.email, userEmail })
      );
    } else {
      ipcRenderer.send('error', validationError);
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

export function getThread({ id, selectedEmail, userEmail }) {
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
              selectedEmail,
              userEmail
            }))
        },
        getFailureType(messageActions)
      ]
    }
  };
}

export function getMessages(threadId) {
  return {
    [RSAA]: {
      endpoint: `${GOOGLE_THREADS_URL}/${threadId}`,
      method: 'GET',
      types: [
        {
          type: getRequestType(messageDetailActions),
          payload: threadId
        },
        {
          type: getSuccessType(messageDetailActions),
          payload: (action, state, res) =>
            res.json().then(payload => payload.messages)
        },
        getFailureType(messageDetailActions)
      ]
    }
  };
}

export function allMessagesSuccess({ selectedEmail, userEmail }) {
  return {
    type: ALL_MESSAGES_SUCCESS,
    payload: {
      selectedEmail,
      userEmail
    }
  };
}
