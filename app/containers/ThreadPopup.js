// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThreadPopup from '../components/ThreadPopup';
import { getThread } from '../actions/threads';

export default connect(
  state => ({
    messages: state.data.messages
  }),
  dispatch =>
    bindActionCreators(
      {
        getThread
      },
      dispatch
    )
)(ThreadPopup);
