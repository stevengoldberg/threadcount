// @flow
import { SIGN_OUT, tokenActions } from '../actions/auth';
import { getSuccessType } from '../utils/type-utils';

type actionType = {
  +type: string
};

const initialState = {};

export default function authReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case getSuccessType(tokenActions):
      return Object.assign({}, state, action.payload);
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
