import find from 'lodash/find';
import get from 'lodash/get';

export const getFromValue = message => {
  const headers = get(message, 'payload.headers');
  return get(find(headers, { name: 'From' }), 'value');
};

export function isMessageTheirs(email, message) {
  return getFromValue(message).indexOf(email) > -1;
}

export function isMessageOurs(email1, email2, message) {
  const fromValue = getFromValue(message);
  return fromValue.indexOf(email1) > -1 || fromValue.indexOf(email2) > -1;
}
