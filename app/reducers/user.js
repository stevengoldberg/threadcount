// @flow
import { SIGN_OUT, profileActions } from '../actions/auth';
import { getSuccessType } from '../utils/type-utils';

type actionType = {
  +type: string
};

const initialState = {};

export default function userReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case getSuccessType(profileActions):
      return Object.assign({}, state, action.payload);
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
