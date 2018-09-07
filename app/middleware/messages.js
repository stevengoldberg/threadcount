import { messageActions, messageDetailActions } from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';

export default store => next => action => {
  const { dispatch } = store;
  const { payload } = action;
  const isInPopup = window.location.hash.includes('thread');

  switch (action.type) {
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
