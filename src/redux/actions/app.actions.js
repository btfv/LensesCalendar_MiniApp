import UserServices from '../../services/user.service';
import AppConstants from '../constants/app.constants';

const AppActions = {};

AppActions.startSpinner = () => ({
  type: AppConstants.START_SPINNER,
});

AppActions.stopSpinner = () => ({
  type: AppConstants.STOP_SPINNER,
});

AppActions.setPopout = (popout) => ({
  type: AppConstants.SET_POPOUT,
  popout,
});

AppActions.setNotificationsMode = (mode) => async (dispatch) => {
  dispatch({
    type: AppConstants.SET_NOTIFICATIONS_MODE,
    mode,
  });
};

AppActions.setNotificationsModeAndUpdateOnServer =
  (mode) => async (dispatch) => {
    dispatch(AppActions.startSpinner());
    await UserServices.setNotificationsMode(mode)
      .then(() => {
        dispatch(AppActions.setNotificationsMode(mode));
        dispatch(AppActions.stopSpinner());
      })
      .catch(() => {
        dispatch(AppActions.stopSpinner());
      });
  };

AppActions.setActivePanel = (panel) => ({
  type: AppConstants.SET_ACTIVE_PANEL,
  panel,
});

export default AppActions;
