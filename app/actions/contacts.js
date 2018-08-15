import { RSAA } from 'redux-api-middleware';
import { typeGenerator } from '../utils/type-utils';

export const contactActions = typeGenerator('contacts');
export const contactSearchActions = typeGenerator('contacts/search');
export const UPDATE_START_DATE = 'UPDATE_START_DATE';
export const UPDATE_END_DATE = 'UPDATE_END_DATE';

const GOOGLE_CONTACTS_URL =
  'https://www.google.com/m8/feeds/contacts/default/full?alt=json&sortorder=descending&v=3.0';

export function getContacts(nextUrl) {
  return {
    [RSAA]: {
      endpoint: () => nextUrl || GOOGLE_CONTACTS_URL,
      method: 'GET',
      types: contactActions
    }
  };
}

export function searchContacts(search) {
  return {
    [RSAA]: {
      endpoint: () =>
        search ? `${GOOGLE_CONTACTS_URL}&q=${search}` : GOOGLE_CONTACTS_URL,
      method: 'GET',
      types: contactSearchActions
    }
  };
}

export function updateStartDate(date) {
  return {
    type: UPDATE_START_DATE,
    payload: date
  };
}

export function updateEndDate(date) {
  return {
    type: UPDATE_END_DATE,
    payload: date
  };
}
