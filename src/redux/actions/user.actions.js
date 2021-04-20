import UserConstants from '../constants/user.constants';
import UserServices from '../services/user.service';
import AppActions from './app.actions';

const UserActions = {};

UserActions.getData = () => {
	return (dispatch) => {
		dispatch(AppActions.startSpinner);
		UserServices.getData().then((data) => {
			dispatch({ type: UserConstants.DATA_SUCCESS, data });
		});
        dispatch(AppActions.stopSpinner);
	};
};

export default UserActions;
