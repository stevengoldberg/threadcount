import { threadActions, queryThreads } from '../actions/threads';
import { getSuccessType } from '../utils/type-utils';

let threadList = [];
let lastValues = '';

export default store => next => action => {
  const { dispatch } = store;

  switch (action.type) {
    case getSuccessType(threadActions):
      if (JSON.stringify(action.payload.values) !== lastValues) {
        threadList = [];
      }
      lastValues = JSON.stringify(action.payload.values);
      threadList = threadList.concat(action.payload.threads);
      if (action.payload.nextPageToken) {
        dispatch(
          queryThreads(action.payload.values, action.payload.nextPageToken)
        );
      } else {
        next({
          type: getSuccessType(threadActions),
          payload: {
            threadList,
            email: action.payload.values.theirEmail
          }
        });
      }
      break;
    default:
      return next(action);
  }
};
