export const UPDATE_START_DATE = 'UPDATE_START_DATE';
export const UPDATE_END_DATE = 'UPDATE_END_DATE';
export const UPDATE_SELECTED_EMAIL = 'UPDATE_SELECTED_EMAIL';

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
