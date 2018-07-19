// @flow

import mapValues from 'lodash/mapValues';
import { ALL_MESSAGES } from '../middleware/messages';
import { SIGN_OUT } from '../actions/auth';

type actionType = {
  +type: string
};

const initialState = {};

export default function messagesReducer(
  state = initialState,
  action: actionType
) {
  const { payload } = action;
  switch (action.type) {
    case ALL_MESSAGES:
      return {
        ...state,
        ...mapValues(payload, thread => thread.messages)
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
