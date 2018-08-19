// @flow
import reduce from 'lodash/reduce';
import { messageActions } from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';
import { SIGN_OUT } from '../actions/auth';
import isMessageTheirs from '../utils/is-message-theirs';
import decodeMessage from '../utils/decode-message';
import cleanMessage from '../utils/clean-message';

type actionType = {
  +type: string
};

const getWordCount = message => {
  const decodedMessage = decodeMessage(message);
  const cleanedMessage = cleanMessage(decodedMessage);
  return cleanedMessage === '' ? 0 : cleanedMessage.split(' ').length;
};

function calculateCounts(messages, theirEmail, init) {
  return reduce(
    messages,
    (acc, message) => {
      const wordCount = getWordCount(message);
      if (isMessageTheirs(theirEmail, message)) {
        return {
          ...acc,
          totalMessages: acc.totalMessages + 1,
          theirMessages: acc.theirMessages + 1,
          theirWords: acc.theirWords + wordCount,
          totalWords: acc.totalWords + wordCount
        };
      }
      return {
        ...acc,
        totalMessages: acc.totalMessages + 1,
        myMessages: acc.myMessages + 1,
        myWords: acc.myWords + wordCount,
        totalWords: acc.totalWords + wordCount
      };
    },
    init
  );
}

function updateCounts(
  acc = {
    totalMessages: 0,
    totalWords: 0,
    myMessages: 0,
    myWords: 0,
    theirMessages: 0,
    theirWords: 0
  },
  { theirEmail, myEmail, messages }
) {
  const filteredMessages = messages.filter(
    message =>
      isMessageTheirs(myEmail, message) || isMessageTheirs(theirEmail, message)
  );
  return calculateCounts(filteredMessages, theirEmail, acc);
}

const initialState = {};

export default function messagesReducer(
  state = initialState,
  action: actionType
) {
  const { payload } = action;
  switch (action.type) {
    case getSuccessType(messageActions):
      return {
        ...state,
        [payload.theirEmail]: updateCounts(state[payload.theirEmail], payload)
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
