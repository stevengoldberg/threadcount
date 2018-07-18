// @flow

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
  let oldList;
  switch (action.type) {
    case getSuccessType(threadActions):
      oldList = state[payload.email] || [];
      return {
        ...state,
        [payload.email]: oldList.concat(payload.threadList)
      };
    default:
      return state;
  }
}
