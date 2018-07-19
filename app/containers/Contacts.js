// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Contacts from '../components/Contacts';
import * as contactActions from '../actions/contacts';
import * as messageActions from '../actions/threads';

export default connect(
  state => ({
    contactList: state.data.contacts.contactList,
    nextUrl: state.data.contacts.nextUrl,
    accessToken: state.data.auth.accessToken
  }),
  dispatch =>
    bindActionCreators(
      {
        ...contactActions,
        ...messageActions
      },
      dispatch
    )
)(Contacts);
