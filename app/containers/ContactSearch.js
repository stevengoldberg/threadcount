// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactSearch from '../components/ContactSearch';
import * as messageActions from '../actions/threads';
import * as contactActions from '../actions/contacts';

export default connect(
  state => ({
    startDate: state.ui.selectedStartDate,
    endDate: state.ui.selectedEndDate
  }),
  dispatch =>
    bindActionCreators(
      {
        ...messageActions,
        ...contactActions
      },
      dispatch
    )
)(ContactSearch);
