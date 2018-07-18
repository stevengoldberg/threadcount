// @flow
import { connect } from 'react-redux';
import ThreadList from '../components/ThreadList';

export default connect(state => ({
  threadsByEmail: state.threadsByEmail
}))(ThreadList);
