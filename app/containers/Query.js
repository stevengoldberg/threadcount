// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Query from '../components/Query';
import { queryThreads } from '../actions/threads';
import * as uiActions from '../actions/ui';

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
        ...uiActions
      },
      dispatch
    )
)(Query);
