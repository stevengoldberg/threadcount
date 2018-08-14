// @flow

import { threadActions } from '../actions/threads';
import { getSuccessType, getRequestType } from '../utils/type-utils';
import { SIGN_OUT } from '../actions/auth';

type actionType = {
  +type: string
};

const initialState = {
  selectedEmail: '',
  loadingThreads: false
};

export default function uiReducer(state = initialState, action: actionType) {
  const { payload } = action;
  switch (action.type) {
    case getRequestType(threadActions):
      return {
        ...state,
        loadingThreads: true
      };
    case getSuccessType(threadActions):
      return {
        ...state,
        selectedEmail: payload.email,
        loadingThreads: false
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
