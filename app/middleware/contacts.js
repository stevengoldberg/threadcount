import { profileActions } from '../actions/auth';
import { getSuccessType } from '../utils/type-utils';
import { searchContacts } from '../actions/contacts';

// eslint-disable-next-line no-unused-vars
export default store => next => action => {
  const { dispatch } = store;

  switch (action.type) {
    case getSuccessType(profileActions):
      dispatch(searchContacts(''));
      return next(action);
    default:
      return next(action);
  }
};
