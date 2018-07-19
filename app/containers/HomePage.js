// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import * as AuthActions from '../actions/auth';
import { initApp } from '../actions/home';

export default connect(
  state => ({ user: state.data.user }),
  dispatch =>
    bindActionCreators(
      {
        ...AuthActions,
        initApp
      },
      dispatch
    )
)(Home);
