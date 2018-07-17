// @flow

import keyBy from 'lodash/keyBy';
import { threadActions } from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';

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
        [payload.email]: {
          ...state[payload.email],
          ...keyBy(payload.threadList, 'id')
        }
      };
    default:
      return state;
  }
}
