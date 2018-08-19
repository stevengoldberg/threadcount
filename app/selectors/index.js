import { createSelector } from 'reselect';

export const selectedEmailSelector = state => state.ui.lastQuery.selectedEmail;
export const threadsByEmailSelector = state => state.data.threadsByEmail;
export const selectedStartDateSelector = state =>
  state.ui.lastQuery.selectedStartDate;
export const selectedEndDateSelector = state =>
  state.ui.lastQuery.selectedEndDate;

export const selectedThreadsSelector = createSelector(
  selectedEmailSelector,
  threadsByEmailSelector,
  (email, threads) => threads[email]
);

export const messageCountsByEmailSelector = state =>
  state.data.messageCountsByEmail;
export const userEmailSelector = state => state.data.user.email;
export const areMessagesLoadingSelector = state => state.ui.loadingMessages;
