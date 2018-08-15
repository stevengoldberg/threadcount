// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactList from '../components/ContactList';
import * as contactActions from '../actions/contacts';
import * as messageActions from '../actions/threads';

export default connect(
  state => ({
    contactList: state.data.contacts.contactList,
    nextUrl: state.data.contacts.nextUrl,
    accessToken: state.data.auth.accessToken,
    startDate: state.ui.selectedStartDate,
    endDate: state.ui.selectedEndDate
  }),
  dispatch =>
    bindActionCreators(
      {
        ...contactActions,
        ...messageActions
      },
      dispatch
    )
)(ContactList);
