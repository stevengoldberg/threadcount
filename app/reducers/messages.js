// @flow
import reduce from 'lodash/reduce';
import pickBy from 'lodash/pickBy';
import upperFirst from 'lodash/upperFirst';
import { AllHtmlEntities } from 'html-entities';
import {
  messageActions,
  threadActions,
  ALL_MESSAGES_SUCCESS
} from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';
import { SIGN_OUT } from '../actions/auth';
import { isMessageTheirs, isMessageOurs } from '../utils/is-message-ours';
import decodeMessage from '../utils/decode-message';
import cleanMessage from '../utils/clean-message';
import WORD_CLOUD_EXCLUDE from '../utils/word-cloud-exclude';

type actionType = {
  +type: string
};

const getCleanedMessage = message => cleanMessage(decodeMessage(message));

const getWordCount = message =>
  message === '' ? 0 : message.split(' ').length;

function calculateCounts(messages, theirEmail, init) {
  return reduce(
    messages,
    (acc, message) => {
      const cleanedMessage = getCleanedMessage(message);
      const wordCount = getWordCount(cleanedMessage);
      const result = { ...acc };

      if (isMessageTheirs(theirEmail, message)) {
        result.theirMessages = acc.theirMessages + 1;
        result.theirWords = acc.theirWords + wordCount;
      } else {
        result.myMessages = acc.myMessages + 1;
        result.myWords = acc.myWords + wordCount;
      }
      cleanedMessage.split(' ').forEach(word => {
        const test = AllHtmlEntities.decode(upperFirst(word.toLowerCase()))
          .replace(/[^a-zA-Z'\s]|_/g, '')
          .replace(/\s+/g, ' ');
        if (WORD_CLOUD_EXCLUDE.includes(test)) {
          return result;
        }
        if (result.frequencyMap[test]) {
          result.frequencyMap[test] += 1;
        } else {
          result.frequencyMap[test] = 1;
        }
      });
      return result;
    },
    init
  );
}

function updateCounts(
  acc = {
    myMessages: 0,
    myWords: 0,
    theirMessages: 0,
    theirWords: 0,
    frequencyMap: {}
  },
  { theirEmail, myEmail, messages }
) {
  const filteredMessages = messages.filter(message =>
    isMessageOurs(myEmail, theirEmail, message)
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
    case getSuccessType(threadActions):
      return {
        ...state,
        [payload.email]: undefined
      };
    case getSuccessType(messageActions):
      return {
        ...state,
        [payload.theirEmail]: updateCounts(state[payload.theirEmail], payload)
      };
    case ALL_MESSAGES_SUCCESS:
      return {
        ...state,
        [payload]: {
          ...state[payload],
          frequencyMap: pickBy(state[payload].frequencyMap, value => value > 3)
        }
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
