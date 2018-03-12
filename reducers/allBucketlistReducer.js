import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function allBucketlistReducer(
  state = initialState.allData,
  action,
) {
  let bucketList;

  switch (action.type) {
    case types.ADD_NEW_BUCKETLIST:
      return {
        ...state,
        newBucketlists: [action.bucketlist, ...state.newBucketlists],
        count: state.count + 1,
      };

    case types.LOAD_MORE_BUCKETLISTS:
      return {
        ...state,
        bucketlists: [...state.newBucketlists, ...state.bucketlists],
        newBucketlists: [],
        count: 0,
      };

    case types.LOAD_ALL_BUCKETLISTS_SUCCESS:
      return {
        ...action.data,
        newBucketlists: [],
        count: 0,
      };

    case types.CREATE_BUCKETLIST_SUCCESS:
      bucketList = { ...action.bucketlist, items: [], comments: [] };
      return {
        ...state, bucketlists: [bucketList, ...state.bucketlists],
      };

    case types.UPDATE_BUCKETLIST_SUCCESS:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map(bucketlist =>
            ((bucketlist.id === action.bucketlist.id) ?
              action.bucketlist :
              {
                ...bucketlist,
                items: bucketlist.items || [],
                comments: bucketlist.comments || [],
              })),
        ],
      };

    case types.DELETE_BUCKETLIST_SUCCESS:
      return {
        ...state,
        bucketlists: [...state.bucketlists
          .filter(bucketlist => bucketlist.id !== action.bucketlist.id)],
      };

    case types.CREATE_ITEM_SUCCESS:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.bucketlist.id) {
              return {
                ...bucketlist,
                items: [action.item, ...bucketlist.items],
              };
            }
            return bucketlist;
          }),
        ],
      };

    case types.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.bucketlist.id) {
              return {
                ...bucketlist,
                items: [
                  ...bucketlist.items
                    .map(item => (
                      (item.id === action.item.id) ?
                        action.item :
                        item)),
                ],
              };
            }
            return bucketlist;
          }),
        ],
      };

    case types.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.bucketlist.id) {
              return {
                ...bucketlist,
                items: [...bucketlist.items.filter(item => item.id !== action.item.id)],
              };
            }
            return bucketlist;
          }),
        ],
      };

    case types.ADD_COMMENT:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.bucketlist.id) {
              return {
                ...bucketlist,
                comments: [action.comment, ...bucketlist.comments],
              };
            }
            return bucketlist;
          }),
        ],
      };

    case types.EDIT_COMMENT:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.bucketlist.id) {
              return {
                ...bucketlist,
                comments: [
                  ...bucketlist.comments
                    .map(comment => (
                      (comment.id === action.comment.id) ?
                        action.comment :
                        comment)),
                ],
              };
            }
            return bucketlist;
          }),
        ],
      };

    case types.DELETE_COMMENT:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.bucketlist.id) {
              return {
                ...bucketlist,
                comments: [...bucketlist.comments
                  .filter(comment => comment.id !== action.comment.id)],
              };
            }
            return bucketlist;
          }),
        ],
      };

    case types.LIKE:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.like.bucketlistId) {
              return {
                ...bucketlist,
                likes: [action.like, ...bucketlist.likes || []],
              };
            }
            return bucketlist;
          }),
        ],
      };

    case types.UNLIKE:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map(bucketlist => ({
            ...bucketlist,
            likes: [...bucketlist.likes
              .filter(like => like.id !== action.like.id)],
          })),
        ],
      };


    default:
      return state;
  }
}
