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
import UserActions from '../redux/actions/user.actions';

const Settings = ({ id, clearData }) => {
  return (
    <ModalPage id={id}>
      <ModalPageHeader>Настройки</ModalPageHeader>
      <Div>
        <Group>
          <Cell disabled after={<Switch />}>
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
  return {};
};

const mapDispatchToProps = {
  clearData: UserActions.clearData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
