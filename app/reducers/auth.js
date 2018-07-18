// @flow
import { SIGN_OUT, tokenActions } from '../actions/auth';
import { getSuccessType } from '../utils/type-utils';

type actionType = {
  +type: string
};

const initialState = {
  accessToken: '',
  idToken: '',
  expiresIn: 0,
  tokenType: '',
  refreshToken: ''
};

export default function authReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case getSuccessType(tokenActions):
      return {
        accessToken: action.payload.access_token,
        idToken: action.payload.id_token,
        expiresIn: action.payload.expires_in,
        tokenType: action.payload.token_type,
        refreshToken: action.payload.refresh_token
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
