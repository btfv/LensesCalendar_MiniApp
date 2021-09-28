import UserConstants from '../constants/user.constants';
import UserServices from '../services/user.service';
import AppActions from './app.actions';
import bridge from '@vkontakte/vk-bridge';
const UserActions = {};

UserActions.auth = (params) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(AppActions.startSpinner());
    UserServices.auth(params)
      .then(() => {
        dispatch(AppActions.stopSpinner());
        resolve();
      })
      .catch(() => {
        dispatch(AppActions.stopSpinner());
        reject();
      });
  });

UserActions.getData = () => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(AppActions.startSpinner());
    UserServices.getData()
      .then((data) => {
        dispatch({ type: UserConstants.DATA_SUCCESS, data });
        dispatch(AppActions.stopSpinner());
        resolve(data);
      })
      .catch(() => {
        dispatch(AppActions.stopSpinner());
        reject();
      });
  });

UserActions.swapLenses = () => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(AppActions.startSpinner());
    UserServices.swapLenses()
      .then(({ swapDate, ...data }) => {
        dispatch({
          type: UserConstants.SWAP_LENSES_SUCCESS,
          newDate: swapDate,
        });
        dispatch(AppActions.stopSpinner());
        resolve();
      })
      .catch(() => {
        dispatch(AppActions.stopSpinner());
        reject();
      });
  });

UserActions.swapLiquid = () => {
  return (dispatch) => {
    dispatch(AppActions.startSpinner());
    UserServices.swapLiquid()
      .then(({ swapDate, ...data }) => {
        dispatch({
          type: UserConstants.SWAP_LIQUID_SUCCESS,
          newDate: swapDate,
        });
        dispatch(AppActions.stopSpinner());
      })
      .catch(() => {
        dispatch(AppActions.stopSpinner());
      });
  };
};

UserActions.addData = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(AppActions.startSpinner());
    UserServices.addData(data)
      .then(() => {
        dispatch({
          type: UserConstants.ADD_DATA_SUCCESS,
          data,
        });
        dispatch(AppActions.stopSpinner());
        resolve();
      })
      .catch(() => {
        dispatch(AppActions.stopSpinner());
        reject();
      });
  });

UserActions.removeDate = (date) => (dispatch) => {
  new Promise((resolve, reject) => {
    dispatch(AppActions.startSpinner());
    UserServices.removeDate(date)
      .then(() => {
        dispatch({
          type: UserConstants.REMOVE_DATE_SUCCESS,
          date,
        });
        dispatch(AppActions.stopSpinner());
        resolve();
      })
      .catch(() => {
        dispatch(AppActions.stopSpinner());
        reject();
      });
  });
};

UserActions.clearData = () => (dispatch) => {
  new Promise((resolve, reject) => {
    dispatch(AppActions.startSpinner());
    UserServices.clearData()
      .then(() => {
        dispatch(AppActions.stopSpinner());
        bridge.send('VKWebAppClose').then(() => {
          resolve();
        });
      })
      .catch(() => {
        dispatch(AppActions.stopSpinner());
        reject();
      });
  });
};

export default UserActions;
