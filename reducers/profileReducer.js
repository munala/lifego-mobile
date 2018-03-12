import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function errorReducer(
  state = initialState.profile,
  action,
) {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS:
      return { ...action.profile, searchUsers: [] };

    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...action.profile,
        friends: state.friends,
        followers: state.followers,
        searchUsers: state.searchUsers,
      };

    case types.ADD_FRIEND_SUCCESS:
      return {
        ...state,
        friends: [action.friend, ...state.friends],
      };

    case types.ADD_FOLLOWER:
      return {
        ...state,
        followers: [action.follower, ...state.followers],
      };

    case types.REMOVE_FRIEND_SUCCESS:
      return {
        ...state,
        friends: [...state.friends].filter(friend => friend.id !== action.friend.id),
      };

    case types.REMOVE_FOLLOWER:
      return {
        ...state,
        followers: [...state.followers].filter(follower => follower.id !== action.follower.id),
      };

    case types.SEARCH_USERS:
      return { ...state, searchUsers: action.users.filter(user => user.id !== state.id) };

    default:
      return state;
  }
}
