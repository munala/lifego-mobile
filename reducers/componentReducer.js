import { HANDLE_HEADER } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.components, action) => {
  switch (action.type) {
    case HANDLE_HEADER:
      return {
        ...state,
        showHeader: action.showHeader,
      };

    default:
      return state;
  }
};
