import find from 'lodash/find';
import get from 'lodash/get';

export default function isMessageTheirs(email, message) {
  const headers = get(message, 'payload.headers');
  const fromValue = get(find(headers, { name: 'From' }), 'value');
  return fromValue.indexOf(email) > -1;
}
