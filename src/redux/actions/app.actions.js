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

export default AppActions;
