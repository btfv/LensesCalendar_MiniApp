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

UserActions.swapLenses = () => {
  return (dispatch) => {
    dispatch(AppActions.startSpinner);
    UserServices.swapLenses().then(({ swapDate, ...data }) => {
      dispatch({ type: UserConstants.SWAP_LENSES_SUCCESS, newDate: swapDate });
    });
  };
};

UserActions.swapLiquid = () => {
  return (dispatch) => {
    dispatch(AppActions.startSpinner);
    UserServices.swapLiquid().then(({ swapDate, ...data }) => {
      dispatch({ type: UserConstants.SWAP_LIQUID_SUCCESS, newDate: swapDate });
    });
  };
};

export default UserActions;
