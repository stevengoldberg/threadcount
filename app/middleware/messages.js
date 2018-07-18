import keyBy from 'lodash/keyBy';
import { threadActions, getThread } from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';

export const ALL_MESSAGES = 'ALL_MESSAGES';

export default store => next => action => {
  const { dispatch } = store;
  const { payload } = action;

  switch (action.type) {
    case getSuccessType(threadActions):
      next(action);
      return Promise.all(
        payload.threadList.map(thread => dispatch(getThread(thread.id)))
      ).then(res =>
        next({
          type: ALL_MESSAGES,
          payload: keyBy(res.map(threadResonse => threadResonse.payload), 'id')
        })
      );
    default:
      return next(action);
  }
};
