import * as actions from '../actions/actionTypes';

const initialState = [];

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_NOTIFICATION:
      return [...state, action.notification];
    case actions.REMOVE_NOTIFICATION_BY_ID:
      return state.filter(notification => notification.id !== action.notificationId);
    default:
      return state;
  }
};
