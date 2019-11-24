import nanoid from 'nanoid';
import * as types from './actionTypes';

export const NOTIFICATION_DEFAULT_TIMEOUT = 3000;

export default function addNotification(notification) {
  return dispatch => {
    const notificationId = nanoid();
    dispatch({
      type: types.ADD_NOTIFICATION,
      notification: { ...notification, id: notificationId }
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_NOTIFICATION_BY_ID,
        notificationId
      });
    }, notification.timeout || NOTIFICATION_DEFAULT_TIMEOUT);
  };
}
