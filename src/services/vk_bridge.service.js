import bridge from '@vkontakte/vk-bridge';
import AppActions from '../redux/actions/app.actions';
import store from '../redux/store.js';

const InitVkBridge = async () => {
  bridge.subscribe(({ detail: { type, data } }) => {
    if (type === 'VKWebAppUpdateConfig') {
      const schemeAttribute = document.createAttribute('scheme');
      schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
      document.body.attributes.setNamedItem(schemeAttribute);
    }
    if (type === 'VKWebAppAllowNotificationsResult') {
      store.dispatch(AppActions.setNotificationsModeAndUpdateOnServer(true));
    }
    if (type === 'VKWebAppDenyNotificationsResult') {
      store.dispatch(AppActions.setNotificationsModeAndUpdateOnServer(false));
    }
  });
  if (store.getState().AppReducer.config.notificationsAllowed === null)
    await AllowNotifications();
};

const AllowNotifications = async () => {
  return await bridge.send('VKWebAppAllowNotifications');
};

const DenyNotifications = async () => {
  return await bridge.send('VKWebAppDenyNotifications');
};

const CloseApp = async () => {
  return await bridge.send('VKWebAppClose');
};

export { InitVkBridge, DenyNotifications, AllowNotifications, CloseApp };
