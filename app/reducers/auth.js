// @flow
import { GET_TOKEN, GET_USER, SIGN_OUT } from '../actions/auth';

export type counterStateType = {
  +counter: number
};

type actionType = {
  +type: string
};

const initialState = {
  token: {},
  user: {}
};

export default function user(state = initialState, action: actionType) {
  switch (action.type) {
    case GET_TOKEN:
      return Object.assign({}, state, {
        token: action.payload
      });
    case GET_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
