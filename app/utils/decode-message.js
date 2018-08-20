import get from 'lodash/get';
import find from 'lodash/find';
import striptags from 'striptags';
import base64js from 'base64-js';

const getMessageData = message => {
  const mimeType = get(message, 'payload.mimeType');
  if (mimeType === 'text/html') {
    return get(message, 'payload.body.data', '');
  } else if (mimeType === 'multipart/alternative') {
    const parts = get(message, 'payload.parts');
    return get(find(parts, { mimeType: 'text/html' }), 'body.data', '');
  }
  return '';
};

export default function(message) {
  // https://mzl.la/2w4NpBy
  const decodeHTML = (str, encoding = 'utf-8') => {
    const bytes = base64js.toByteArray(str);
    return new TextDecoder(encoding).decode(bytes);
  };
  const messageData = getMessageData(message);
  // let decodedMessage;
  // try {
  //   decodedMessage = atob(messageData);
  // } catch (e) {
  const decodedMessage = striptags(decodeHTML(messageData));
  // }
  return decodedMessage;
}
