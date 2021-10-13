import { PANELS_HOME } from '../../constants/panels.constants';
import AppConstants from '../constants/app.constants';

const initialState = {
  spin: false,
  config: {
    notificationsAllowed: null,
  },
  activePanel: PANELS_HOME,
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case AppConstants.START_SPINNER:
      return {
        ...state,
        spin: true,
      };
    case AppConstants.STOP_SPINNER:
      return {
        ...state,
        spin: false,
      };
    case AppConstants.SET_POPOUT:
      return {
        ...state,
        popout: action.popout,
      };
    case AppConstants.ALLOW_NOTIFICATIONS:
      return {
        ...state,
        config: {
          ...state.config,
          notificationsAllowed: true,
        },
      };
    case AppConstants.DENY_NOTIFICATIONS:
      return {
        ...state,
        config: {
          ...state.config,
          notificationsAllowed: false,
        },
      };
    case AppConstants.SET_ACTIVE_PANEL:
      return {
        ...state,
        activePanel: action.panel,
      };
    case AppConstants.SET_NOTIFICATIONS_MODE:
      return {
        ...state,
        config: {
          ...state.config,
          notificationsAllowed: action.mode,
        },
      };
    default:
      return state;
  }
}
