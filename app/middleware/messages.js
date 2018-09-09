import { messageActions, messageDetailActions } from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';

export default store => next => action => {
  const { dispatch } = store;
  const { payload } = action;
  const isInPopup = window.location.hash.includes('thread');

  switch (action.type) {
    /*
     * When messages are fetched by the thread popup, we need to store the actual message
     * data, not just the count metadata
     */
    case getSuccessType(messageActions):
      if (isInPopup) {
        dispatch({
          type: getSuccessType(messageDetailActions),
          payload: payload.messages
        });
      }
      return next(action);
    default:
      return next(action);
  }
};
