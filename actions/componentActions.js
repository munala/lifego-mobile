import { HANDLE_HEADER } from './actionTypes';

export const handleHeader = showHeader => (dispatch) => {
  console.log({ showHeader });
  dispatch({
    type: HANDLE_HEADER,
    showHeader,
  });
};
