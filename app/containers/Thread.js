// @flow
import { connect } from 'react-redux';
import Thread from '../components/Thread';

export default connect((state, props) => {
  const {
    thread: { id: threadId }
  } = props;
  return {
    messages: state.data.messagesByThreadId[threadId]
  };
})(Thread);
