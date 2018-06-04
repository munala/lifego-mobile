import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function errorReducer(
  state = initialState.otherProfile,
  action,
) {
  switch (action.type) {
    case types.GET_OTHER_PROFILE_SUCCESS:
      return { ...action.profile, searchUsers: [] };

    default:
      return state;
  }
}
