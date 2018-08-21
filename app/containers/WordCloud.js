import { connect } from 'react-redux';
import WordCloud from '../components/WordCloud';
import { areMessagesLoadingSelector } from '../selectors';

export default connect(state => ({
  messageCountsByEmail: state.data.messageCountsByEmail,
  lastQuery: state.ui.lastQuery,
  areMessagesLoading: areMessagesLoadingSelector(state)
}))(WordCloud);
