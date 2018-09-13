// @flow
import { connect } from 'react-redux';
import ThreadList from '../components/ThreadList';
import {
  selectedStartDateSelector,
  selectedEndDateSelector
} from '../selectors';

export default connect(state => ({
  threadsByEmail: state.data.threadsByEmail,
  selectedEmail: state.ui.selectedEmail,
  userEmail: state.data.user.email,
  loadingThreads: state.ui.loadingThreads,
  selectedStartDate: selectedStartDateSelector(state),
  selectedEndDate: selectedEndDateSelector(state)
}))(ThreadList);
