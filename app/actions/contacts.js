import { RSAA } from 'redux-api-middleware';
import { typeGenerator } from '../utils/type-utils';

export const contactActions = typeGenerator('contacts');

const GOOGLE_CONTACTS_URL =
  'https://www.google.com/m8/feeds/contacts/default/full?alt=json&q=name&sortorder=descending';

export function getContacts(nextUrl) {
  return {
    [RSAA]: {
      endpoint: () => nextUrl || GOOGLE_CONTACTS_URL,
      method: 'GET',
      types: contactActions
    }
  };
}
