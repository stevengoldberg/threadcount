// @flow
import moment from 'moment';
import {
  threadActions,
  messageActions,
  messageDetailActions,
  ALL_MESSAGES_SUCCESS
} from '../actions/threads';
import { getSuccessType, getRequestType } from '../utils/type-utils';
import { SIGN_OUT } from '../actions/auth';
import {
  UPDATE_START_DATE,
  UPDATE_END_DATE,
  UPDATE_SELECTED_EMAIL,
  UPDATE_SELECTED_ANALYTIC,
  HYDRATE_STATE
} from '../actions/ui';
import { contactActions, contactSearchActions } from '../actions/contacts';

type actionType = {
  +type: string
};

const initialState = {
  selectedEmail: '',
  selectedStartDate: null,
  selectedEndDate: null,
  lastQuery: {},
  loadingThreads: false,
  loadingMessages: false,
  fetchingContacts: false,
  selectedAnalytic: 'wordCount'
};

export default function uiReducer(state = initialState, action: actionType) {
  const { payload } = action;
  switch (action.type) {
    case getRequestType(threadActions):
      return {
        ...state,
        loadingThreads: true
      };
    case getSuccessType(threadActions):
      return {
        ...state,
        loadingThreads: false,
        lastQuery: {
          selectedEmail: payload.email,
          selectedStartDate: payload.selectedStartDate,
          selectedEndDate: payload.selectedEndDate
        }
      };
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
    case getRequestType(messageActions):
      return {
        ...state,
        loadingMessages: true
      };
    case ALL_MESSAGES_SUCCESS:
    case getSuccessType(messageDetailActions):
      return {
        ...state,
        loadingMessages: false
      };
    case UPDATE_SELECTED_ANALYTIC:
      return {
        ...state,
        selectedAnalytic: payload
      };
    case getRequestType(contactActions):
    case getRequestType(contactSearchActions):
      return {
        ...state,
        fetchingContacts: true
      };
    case getSuccessType(contactActions):
    case getSuccessType(contactSearchActions):
      return {
        ...state,
        fetchingContacts: false
      };
    case SIGN_OUT:
      return initialState;
    case HYDRATE_STATE:
      return {
        ...state,
        selectedEmail: payload.selectedEmail,
        lastQuery: {
          selectedEmail: payload.selectedEmail,
          selectedStartDate: moment(payload.selectedStartDate),
          selectedEndDate: moment(payload.selectedEndDate)
        }
      };
    default:
      return state;
  }
}
