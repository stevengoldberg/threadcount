// @flow

import { threadActions } from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';
import { SIGN_OUT } from '../actions/auth';

type actionType = {
  +type: string
};

const initialState = {
  selectedEmail: ''
};

export default function uiReducer(state = initialState, action: actionType) {
  const { payload } = action;
  switch (action.type) {
    case getSuccessType(threadActions):
      return {
        ...state,
        selectedEmail: payload.email
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
