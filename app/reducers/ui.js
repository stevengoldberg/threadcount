// @flow
import moment from 'moment';
import { threadActions } from '../actions/threads';
import { getSuccessType, getRequestType } from '../utils/type-utils';
import { SIGN_OUT } from '../actions/auth';
import { INIT_APP } from '../actions/home';
import {
  UPDATE_START_DATE,
  UPDATE_END_DATE,
  UPDATE_SELECTED_EMAIL
} from '../actions/ui';

type actionType = {
  +type: string
};

const initialState = {
  selectedEmail: '',
  selectedStartDate: '',
  selectedEndDate: '',
  loadingThreads: false
};

export default function uiReducer(state = initialState, action: actionType) {
  const { payload } = action;
  const now = moment();
  const oneWeekAgo = moment().subtract(1, 'week');
  switch (action.type) {
    case getRequestType(threadActions):
      return {
        ...state,
        loadingThreads: true
      };
    case getSuccessType(threadActions):
      return {
        ...state,
        loadingThreads: false
      };
    case SIGN_OUT:
      return initialState;
    case UPDATE_START_DATE:
      return {
        ...state,
        selectedStartDate: payload
      };
    case UPDATE_END_DATE:
      return {
        ...state,
        selectedEndDate: payload
      };
    case UPDATE_SELECTED_EMAIL:
      return {
        ...state,
        selectedEmail: payload
      };
    case INIT_APP:
      return {
        ...state,
        selectedStartDate: oneWeekAgo,
        selectedEndDate: now
      };
    default:
      return state;
  }
}
