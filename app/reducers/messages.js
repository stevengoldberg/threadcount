// @flow

import { messageDetailActions } from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';

type actionType = {
  +type: string
};

const initialState = [];

export default function messagesReducer(
  state = initialState,
  action: actionType
) {
  const { payload } = action;
  switch (action.type) {
    case getSuccessType(messageDetailActions):
      console.log(payload);
      return payload;
    default:
      return state;
  }
}
