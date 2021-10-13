import React from 'react';
import PropTypes from 'prop-types';

import {
  Panel,
  Group,
  Div,
  Text,
  Button,
  Caption,
  Progress,
  PanelHeader,
  PanelHeaderButton,
  Footer,
} from '@vkontakte/vkui';
import UserActions from '../redux/actions/user.actions';
import { connect } from 'react-redux';
import { Icon28Notifications, Icon28Settings } from '@vkontakte/icons';
import ModalActions from '../redux/actions/modal.actions';
import { MODAL_PAGE_SETTINGS } from '../constants/modal.constants';
import { PANELS_CHANGEDATA } from '../constants/panels.constants';
import HomeElement from '../components/Home/HomeElement';
import LensesInfo from '../components/Home/LensesInfo';

const Home = ({
  id,
  go,
  lensesInfo,
  liquidInfo,
  swapLenses,
  swapLiquid,
  changeModal,
}) => {
  if (!lensesInfo) return '';
  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderButton
            onClick={() => {
              changeModal(MODAL_PAGE_SETTINGS);
            }}
          >
            <Icon28Settings />
          </PanelHeaderButton>
        }
      >
        Главная
      </PanelHeader>
      <Group>
        {lensesInfo && (
          <Div>
            <Div>
              <Button
                style={{
                  width: 160,
                  fontSize: 24,
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  display: 'block',
                }}
                size='l'
                onClick={() => swapLenses()}
              >
                Сменить линзы
              </Button>
            </Div>
            <LensesInfo info={lensesInfo} />
          </Div>
        )}
        <Div>
          <Button
            stretched
            size='l'
            mode='secondary'
            onClick={go}
            data-to={PANELS_CHANGEDATA}
          >
            Изменить информацию
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  lensesInfo: PropTypes.shape({
    manufacturer: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    periodicity: PropTypes.number.isRequired,
    dioptreLeft: PropTypes.number.isRequired,
    dioptreRight: PropTypes.number.isRequired,
    curvatureLeft: PropTypes.number.isRequired,
    curvatureRight: PropTypes.number.isRequired,
    swapDates: PropTypes.arrayOf(PropTypes.string),
  }),
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  swapLenses: UserActions.swapLenses,
  swapLiquid: UserActions.swapLiquid,
  changeModal: ModalActions.changeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
