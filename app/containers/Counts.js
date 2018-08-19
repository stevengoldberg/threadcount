import { connect } from 'react-redux';
import Counts from '../components/Counts';
import {
  selectedEmailSelector,
  messageCountsByEmailSelector,
  selectedStartDateSelector,
  selectedEndDateSelector,
  areMessagesLoadingSelector
} from '../selectors';

export default connect(state => ({
  messageCountsByEmail: messageCountsByEmailSelector(state),
  selectedEmail: selectedEmailSelector(state),
  startDate: selectedStartDateSelector(state),
  endDate: selectedEndDateSelector(state),
  areMessagesLoading: areMessagesLoadingSelector(state)
}))(Counts);
