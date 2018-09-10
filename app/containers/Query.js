// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Query from '../components/Query';
import * as uiActions from '../actions/ui';

export default connect(
  state => ({
    startDate: state.ui.selectedStartDate,
    endDate: state.ui.selectedEndDate,
    selectedEmail: state.ui.selectedEmail,
    fetchingContacts: state.ui.fetchingContacts
  }),
  dispatch =>
    bindActionCreators(
      {
        ...uiActions
      },
      dispatch
    )
)(Query);
