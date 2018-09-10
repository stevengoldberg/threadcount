// @flow
import { SIGN_OUT, profileActions, refreshActions } from '../actions/auth';
import { getSuccessType, getFailureType } from '../utils/type-utils';
import { HYDRATE_STATE } from '../actions/ui';

type actionType = {
  +type: string
};

const initialState = {};

export default function userReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case getSuccessType(profileActions):
      return Object.assign({}, state, action.payload);
    case SIGN_OUT:
    case getFailureType(refreshActions):
      return initialState;
    case HYDRATE_STATE:
      return {
        ...state,
        email: action.payload.userEmail
      };
    default:
      return state;
  }
}
