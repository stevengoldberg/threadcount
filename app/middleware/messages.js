import keyBy from 'lodash/keyBy';
import {
  threadActions,
  getThread,
  ALL_MESSAGES_SUCCESS
} from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';

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
          type: ALL_MESSAGES_SUCCESS,
          payload: keyBy(res.map(threadResonse => threadResonse.payload), 'id')
        })
      );
    default:
      return next(action);
  }
};
