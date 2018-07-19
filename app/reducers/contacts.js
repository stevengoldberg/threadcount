import find from 'lodash/find';
import get from 'lodash/get';
import { contactActions, contactSearchActions } from '../actions/contacts';
import { getSuccessType } from '../utils/type-utils';
import { SIGN_OUT } from '../actions/auth';

type actionType = {
  +type: string
};

const initialState = {
  contactList: [],
  nextUrl: ''
};

export default function contactsReucer(
  state = initialState,
  action: actionType
) {
  switch (action.type) {
    case getSuccessType(contactActions):
      return {
        contactList: state.contactList.concat(action.payload.feed.entry),
        nextUrl: get(find(action.payload.feed.link, { rel: 'next' }), 'href')
      };
    case getSuccessType(contactSearchActions):
      return {
        contactList: get(action, 'payload.feed.entry', []),
        nextUrl: get(find(action.payload.feed.link, { rel: 'next' }), 'href')
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
