// @flow
import reduce from 'lodash/reduce';
import upperFirst from 'lodash/upperFirst';
import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';
import fromPairs from 'lodash/fromPairs';
import takeRight from 'lodash/takeRight';
import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import set from 'lodash/set';
import { scaleLinear } from 'd3-scale';
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

function calculateCounts({ messages, selectedEmail, userEmail, init }) {
  return reduce(
    messages,
    (acc, message) => {
      const cleanedMessage = getCleanedMessage(message);
      const wordCount = getWordCount(cleanedMessage);
      const result = { ...acc };
      const messageIsTheirs = isMessageTheirs(selectedEmail, message);
      const sendersEmail = messageIsTheirs ? selectedEmail : userEmail;

      if (messageIsTheirs) {
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
        if (
          WORD_CLOUD_EXCLUDE.includes(test) ||
          test.toLowerCase().includes('http')
        ) {
          return result;
        }
        if (get(result, ['frequencyMap', sendersEmail, test])) {
          result.frequencyMap[sendersEmail][test] += 1;
        } else {
          set(result, ['frequencyMap', sendersEmail, test], 1);
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
  { selectedEmail, userEmail, messages }
) {
  const filteredMessages = messages.filter(message =>
    isMessageOurs(userEmail, selectedEmail, message)
  );
  return calculateCounts({
    messages: filteredMessages,
    selectedEmail,
    userEmail,
    init: acc
  });
}

const MIN_VALUE = 5;
const MAX_VALUE = 100;
const MAX_NUM_VALUES = 300;
/*
 * Returns a new per-user frequency map that discards any words occuring less frequently than the
 * MAX_NUM_VALUES most common words, and all values are between MIN_VALUE and MAX_VALUE
 */
const normalizeFrequencyMap = (frequencyMap = {}) => {
  const valueList = Object.values(frequencyMap);
  const domainMax = Math.max(...valueList);
  const domainMin = Math.min(...valueList);
  const normalize = scaleLinear()
    .domain([domainMin, domainMax])
    .range([MIN_VALUE, MAX_VALUE]);
  const sortedPairs = sortBy(toPairs(frequencyMap), pair => pair[1]);
  const culledFreqMap = fromPairs(takeRight(sortedPairs, MAX_NUM_VALUES));
  return mapValues(culledFreqMap, normalize);
};

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
        [payload.selectedEmail]: updateCounts(
          state[payload.selectedEmail],
          payload
        )
      };
    case ALL_MESSAGES_SUCCESS:
      return {
        ...state,
        [payload.selectedEmail]: {
          ...state[payload.selectedEmail],
          frequencyMap: {
            [payload.selectedEmail]: normalizeFrequencyMap(
              get(state, [
                payload.selectedEmail,
                'frequencyMap',
                payload.selectedEmail
              ])
            ),
            [payload.userEmail]: normalizeFrequencyMap(
              get(state, [
                payload.selectedEmail,
                'frequencyMap',
                payload.userEmail
              ])
            )
          }
        }
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
