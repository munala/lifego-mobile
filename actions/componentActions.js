import { HANDLE_HEADER } from './actionTypes';

export default showHeader => (dispatch) => {
  dispatch({
    type: HANDLE_HEADER,
    showHeader,
  });
};
