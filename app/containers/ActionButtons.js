// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionButtons from '../components/ActionButtons';
import { queryThreads } from '../actions/threads';
import { signOut } from '../actions/auth';

export default connect(
  state => ({
    startDate: state.ui.selectedStartDate,
    endDate: state.ui.selectedEndDate,
    selectedEmail: state.ui.selectedEmail
  }),
  dispatch =>
    bindActionCreators(
      {
        queryThreads,
        signOut
      },
      dispatch
    )
)(ActionButtons);
