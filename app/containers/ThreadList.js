// @flow
import { connect } from 'react-redux';
import ThreadList from '../components/ThreadList';

export default connect(state => ({
  threadsByEmail: state.data.threadsByEmail,
  selectedEmail: state.ui.selectedEmail,
  loadingThreads: state.ui.loadingThreads
}))(ThreadList);
