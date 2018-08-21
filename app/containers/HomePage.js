// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import * as AuthActions from '../actions/auth';
import { initApp } from '../actions/home';
import { searchContacts } from '../actions/contacts';

export default connect(
  state => ({
    user: state.data.user,
    selectedAnalytic: state.ui.selectedAnalytic
  }),
  dispatch =>
    bindActionCreators(
      {
        ...AuthActions,
        initApp,
        searchContacts
      },
      dispatch
    )
)(Home);
