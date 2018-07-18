import find from 'lodash/find';
import get from 'lodash/get';
import { contactActions } from '../actions/contacts';
import { getSuccessType } from '../utils/type-utils';

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
    default:
      return state;
  }
}
