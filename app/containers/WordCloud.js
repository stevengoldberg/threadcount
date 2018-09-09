import { connect } from 'react-redux';
import WordCloud from '../components/WordCloud';
import { areMessagesLoadingSelector } from '../selectors';

export default connect(state => ({
  messageCountsByEmail: state.data.messageCountsByEmail,
  selectedEmail: state.ui.selectedEmail,
  userEmail: state.data.user.email,
  areMessagesLoading: areMessagesLoadingSelector(state)
}))(WordCloud);
