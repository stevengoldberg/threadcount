import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { decode, isUrlSafeBase64 } from 'url-safe-base64';
import base64js from 'base64-js';
import pickBy from 'lodash/pickBy';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import get from 'lodash/get';
import Ratio from '../components/Ratio';

const selectedEmailSelector = state => state.ui.selectedEmail;
const threadsByEmailSelector = state => state.data.threadsByEmail;

const selectedThreadsSelector = createSelector(
  selectedEmailSelector,
  threadsByEmailSelector,
  (email, threads) => threads[email]
);

const messagesSelector = state => state.data.messagesByThreadId;

const selectedMessagesSelector = createSelector(
  messagesSelector,
  selectedThreadsSelector,
  (messages, threads) => {
    const selectedMessagesByThread = pickBy(messages, (message, id) =>
      find(threads, { id })
    );
    return reduce(
      selectedMessagesByThread,
      (acc, thread) => acc.concat(thread),
      []
    );
  }
);

const userEmailSelector = state => state.data.user.email;

const isMessageMine = (myEmail, message) => {
  const headers = get(message, 'payload.headers');
  const fromValue = find(headers, { name: 'From' }).value;
  return fromValue.indexOf(myEmail) > -1;
};

const getWordCount = message => {
  const decodeHTML = (str, encoding = 'utf-8') => {
    const bytes = base64js.toByteArray(str);
    return new TextDecoder(encoding).decode(bytes);
  };
  const messageData = get(message, 'payload.body.data', '');
  let decodedMessage;
  if (isUrlSafeBase64(messageData) && decode(messageData) !== messageData) {
    decodedMessage = decode(messageData);
  } else {
    try {
      decodedMessage = atob(messageData);
    } catch (e) {
      decodedMessage = decodeHTML(messageData);
    }
  }
  return decodedMessage === '' ? 0 : decodedMessage.split(' ').length;
};

function calculateRatio(messages, myEmail) {
  return reduce(
    messages,
    (acc, message) => {
      if (isMessageMine(myEmail, message)) {
        return {
          ...acc,
          myMessages: acc.myMessages + 1,
          myWords: acc.myWords + getWordCount(message)
        };
      }
      return {
        ...acc,
        theirMessages: acc.theirMessages + 1,
        theirWords: acc.theirWords + getWordCount(message)
      };
    },
    {
      totalMessages: messages.length,
      myMessages: 0,
      myWords: 0,
      theirMessages: 0,
      theirWords: 0
    }
  );
}

const ratioSelector = createSelector(
  selectedMessagesSelector,
  userEmailSelector,
  calculateRatio
);

export default connect(state => ({
  selectedMessages: selectedMessagesSelector(state),
  ratio: ratioSelector(state)
}))(Ratio);
