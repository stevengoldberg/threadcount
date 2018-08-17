import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import striptags from 'striptags';
import base64js from 'base64-js';
import pickBy from 'lodash/pickBy';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import get from 'lodash/get';
import Counts from '../components/Counts';

const selectedEmailSelector = state => state.ui.lastQuery.selectedEmail;
const threadsByEmailSelector = state => state.data.threadsByEmail;
const selectedStartDateSelector = state => state.ui.lastQuery.selectedStartDate;
const selectedEndDateSelector = state => state.ui.lastQuery.selectedEndDate;

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

const loadingMessagesSelector = state => state.ui.loadingMessages;

const areMessagesLoadedSelector = createSelector(
  selectedMessagesSelector,
  loadingMessagesSelector,
  (messages, areMessagesLoading) => messages.length > 0 && !areMessagesLoading
);

const userEmailSelector = state => state.data.user.email;

const isMessageMine = (myEmail, message) => {
  const headers = get(message, 'payload.headers');
  const fromValue = get(find(headers, { name: 'From' }), 'value');
  return fromValue.indexOf(myEmail) > -1;
};

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

const getWordCount = message => {
  // https://mzl.la/2w4NpBy
  const decodeHTML = (str, encoding = 'utf-8') => {
    const bytes = base64js.toByteArray(str);
    return new TextDecoder(encoding).decode(bytes);
  };
  const messageData = getMessageData(message);
  let decodedMessage;
  try {
    decodedMessage = atob(messageData);
  } catch (e) {
    decodedMessage = striptags(decodeHTML(messageData));
  }
  return decodedMessage === '' ? 0 : decodedMessage.split(' ').length;
};

function calculateCounts(messages, myEmail) {
  return reduce(
    messages,
    (acc, message) => {
      const wordCount = getWordCount(message);
      if (isMessageMine(myEmail, message)) {
        return {
          ...acc,
          myMessages: acc.myMessages + 1,
          myWords: acc.myWords + wordCount,
          totalWords: acc.totalWords + wordCount
        };
      }
      return {
        ...acc,
        theirMessages: acc.theirMessages + 1,
        theirWords: acc.theirWords + getWordCount(message),
        totalWords: acc.totalWords + wordCount
      };
    },
    {
      totalMessages: messages.length,
      totalWords: 0,
      myMessages: 0,
      myWords: 0,
      theirMessages: 0,
      theirWords: 0
    }
  );
}

const countSelector = createSelector(
  selectedMessagesSelector,
  userEmailSelector,
  calculateCounts
);

export default connect(state => ({
  counts: countSelector(state),
  selectedEmail: selectedEmailSelector(state),
  startDate: selectedStartDateSelector(state),
  endDate: selectedEndDateSelector(state),
  areMessagesLoaded: areMessagesLoadedSelector(state)
}))(Counts);
