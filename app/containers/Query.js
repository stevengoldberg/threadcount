// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Query from '../components/Query';
import * as messageActions from '../actions/threads';

export default connect(
  null,
  dispatch => bindActionCreators(messageActions, dispatch)
)(Query);
