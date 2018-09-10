import {
  NO_SELECTION,
  NO_START_DATE,
  NO_END_DATE,
  QUERY_TOO_LARGE
} from './error-map';

export default function validateQuery(values) {
  let error;
  if (!values.email) {
    error = NO_SELECTION;
  } else if (!values.startDate) {
    error = NO_START_DATE;
  } else if (!values.endDate) {
    error = NO_END_DATE;
  } else if (values.endDate.diff(values.startDate, 'days') > 365) {
    error = QUERY_TOO_LARGE;
  }
  return error;
}
