// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Contacts from '../components/Contacts';
import * as contactActions from '../actions/contacts';

export default connect(
  state => ({
    contactList: state.contacts.contactList,
    nextUrl: state.contacts.nextUrl,
    accessToken: state.auth.accessToken
  }),
  dispatch =>
    bindActionCreators(
      {
        ...contactActions
      },
      dispatch
    )
)(Contacts);
