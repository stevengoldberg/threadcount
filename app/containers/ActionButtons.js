// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionButtons from '../components/ActionButtons';
import { queryThreads } from '../actions/threads';
import { signOut } from '../actions/auth';
import { updateSelectedAnalytic } from '../actions/ui';

export default connect(
  state => ({
    startDate: state.ui.selectedStartDate,
    endDate: state.ui.selectedEndDate,
    selectedEmail: state.ui.selectedEmail,
    selectedAnalytic: state.ui.selectedAnalytic
  }),
  dispatch =>
    bindActionCreators(
      {
        queryThreads,
        signOut,
        updateSelectedAnalytic
      },
      dispatch
    )
)(ActionButtons);
