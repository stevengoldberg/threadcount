// @flow

import pick from 'lodash/pick';
import get from 'lodash/get';
import { threadActions, messageActions } from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';
import { SIGN_OUT } from '../actions/auth';

type actionType = {
  +type: string
};

const initialState = {};

export default function threadsReducer(
  state = initialState,
  action: actionType
) {
  const { payload } = action;
  switch (action.type) {
    case getSuccessType(threadActions):
      return {
        ...state,
        [payload.email]: payload.threadList.map(thread =>
          pick(thread, ['id', 'snippet'])
        )
      };
    case getSuccessType(messageActions):
      return {
        ...state,
        [payload.theirEmail]: state[payload.theirEmail].map(
          thread =>
            thread.id === payload.id
              ? {
                  ...thread,
                  messageCount: payload.messages.length,
                  date: get(payload, 'messages[0].internalDate')
                }
              : thread
        )
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
