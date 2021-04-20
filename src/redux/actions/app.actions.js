import AppConstants from '../constants/app.constants';

const AppActions = {};

AppActions.startSpinner = () => {
	return (dispatch) => {
		dispatch({ type: AppConstants.START_SPINNER });
	};
};

AppActions.stopSpinner = () => {
	return (dispatch) => {
		dispatch({ type: AppConstants.STOP_SPINNER });
	};
};

export default AppActions;
