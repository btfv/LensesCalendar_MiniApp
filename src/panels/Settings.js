import { Icon28DeleteOutline } from '@vkontakte/icons';
import {
  Cell,
  CellButton,
  Div,
  Group,
  ModalPage,
  ModalPageHeader,
  Switch,
} from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppActions from '../redux/actions/app.actions';
import UserActions from '../redux/actions/user.actions';
import {
  AllowNotifications,
  DenyNotifications,
} from '../services/vk_bridge.service';

const Settings = ({
  id,
  clearData,
  notificationsAllowed,
  setNotificationsModeAndUpdateOnServer,
}) => {
  return (
    <ModalPage id={id}>
      <ModalPageHeader>Настройки</ModalPageHeader>
      <Div>
        <Group>
          <Cell
            after={
              <Switch
                checked={notificationsAllowed}
                onChange={() => {
                  notificationsAllowed
                    ? DenyNotifications()
                    : AllowNotifications();
                }}
              />
            }
          >
            Уведомление
          </Cell>
        </Group>
        <Group>
          <CellButton
            before={<Icon28DeleteOutline />}
            mode='danger'
            onClick={() => {
              clearData();
            }}
          >
            Удалить мои данные из приложения
          </CellButton>
        </Group>
      </Div>
    </ModalPage>
  );
};

Settings.propTypes = {
  id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return { notificationsAllowed: state.AppReducer.config.notificationsAllowed };
};

const mapDispatchToProps = {
  clearData: UserActions.clearData,
  setNotificationsModeAndUpdateOnServer:
    AppActions.setNotificationsModeAndUpdateOnServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
