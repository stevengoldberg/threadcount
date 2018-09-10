export const UPDATE_START_DATE = 'UPDATE_START_DATE';
export const UPDATE_END_DATE = 'UPDATE_END_DATE';
export const UPDATE_SELECTED_EMAIL = 'UPDATE_SELECTED_EMAIL';
export const UPDATE_SELECTED_ANALYTIC = 'UPDATE_SELECTED_ANALYTIC';
export const HYDRATE_STATE = 'HYDRATE_STATE';

export function updateSelectedEmail(email) {
  return {
    type: UPDATE_SELECTED_EMAIL,
    payload: email
  };
}

export function updateStartDate(date) {
  return {
    type: UPDATE_START_DATE,
    payload: date
  };
}

export function updateEndDate(date) {
  return {
    type: UPDATE_END_DATE,
    payload: date
  };
}

export function updateSelectedAnalytic(selection) {
  return {
    type: UPDATE_SELECTED_ANALYTIC,
    payload: selection
  };
}

export function hydrateState(state) {
  return {
    type: HYDRATE_STATE,
    payload: state
  };
}
