import {
  PANELS_WELCOME,
} from '../constants/panels.constants';
import AppActions from '../redux/actions/app.actions';
import UserActions from '../redux/actions/user.actions';
import store from '../redux/store';
import { InitVkBridge } from './vk_bridge.service.js';
import { ParamsToObject } from '../utils/utils.js';

const InitApp = async () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  await store.dispatch(UserActions.auth(ParamsToObject(params)));

  await store.dispatch(UserActions.getData).then((receivedData) => {
    if (!receivedData || !receivedData.lenses) {
      store.dispatch(AppActions.setActivePanel(PANELS_WELCOME));
    }
  });
  await InitVkBridge();
};

export { InitApp };
