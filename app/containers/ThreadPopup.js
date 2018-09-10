// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThreadPopup from '../components/ThreadPopup';
import { getThread, allMessagesSuccess } from '../actions/threads';
import { hydrateState } from '../actions/ui';

export default connect(
  state => ({
    messages: state.data.messages
  }),
  dispatch =>
    bindActionCreators(
      {
        getThread,
        allMessagesSuccess,
        hydrateState
      },
      dispatch
    )
)(ThreadPopup);
