import { connect } from 'react-redux';
import { createSelector } from 'reselect';
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

function calculateRatio(messages, myEmail) {
  return reduce(
    messages,
    (acc, message) => {
      if (isMessageMine(myEmail, message)) {
        return {
          ...acc,
          myMessages: acc.myMessages + 1
        };
      }
      return {
        ...acc,
        theirMessages: acc.theirMessages + 1
      };
    },
    {
      totalMessages: messages.length,
      myMessages: 0,
      theirMessages: 0
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
