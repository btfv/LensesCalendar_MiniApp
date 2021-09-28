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
import Scroll from '../components/Scroll';
import lensesPicture from '../img/logo.png';
import { Icon28Notifications, Icon28Settings } from '@vkontakte/icons';
import ModalActions from '../redux/actions/modal.actions';
import { MODAL_PAGE_SETTINGS } from '../constants/modal.constants';

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
function formatDate(string) {
  var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Date(string).toLocaleDateString([], options);
}

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
  const lensesProgressValue =
    lensesInfo.swapDates && lensesInfo.swapDates.length
      ? Math.min(
          (100 * (Date.now() - Date.parse(lensesInfo.swapDates[0]))) /
            (lensesInfo.periodicity * 24 * 60 * 60 * 1000),
          100
        )
      : 0;
  const nextChangeDate =
    lensesInfo.swapDates && lensesInfo.swapDates.length
      ? formatDate(
          addDays(Date(lensesInfo.swapDates[0]), lensesInfo.periodicity)
        )
      : 0;
  return (
    <Panel id={id}>
      <PanelHeader
        // left={
        //   <PanelHeaderButton>
        //     <Icon28Notifications />
        //   </PanelHeaderButton>
        // }
      >
        Главная
      </PanelHeader>
      <Group>
        {lensesInfo && (
          <Div>
            <Div
              style={{
                width: 'fit-content',
                marginBottom: 0,
                fontSize: 24,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
            >
              <img src={lensesPicture} height='100px' />
            </Div>
            <Div
              style={{
                width: 'fit-content',
                fontSize: 24,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
            >
              {/*<Button
            style={{
              width: 160,
              fontSize: 24,
              marginRight: 'auto',
              marginLeft: 'auto',
              display: 'block',
              marginBottom: 16,
            }}
            mode='secondary'
            size='l'
          >
            Выбрать
          </Button>*/}
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
            <Div>
              <Text
                weight='regular'
                style={{
                  width: 'fit-content',
                  marginBottom: 0,
                  fontSize: 24,
                  marginRight: 'auto',
                  marginLeft: 'auto',
                }}
              >
                {lensesInfo.name}
              </Text>
              <Caption
                weight='regular'
                style={{
                  margin: 5,
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#909499',
                }}
              >
                {'L ' +
                  lensesInfo.dioptreLeft +
                  ' ' +
                  lensesInfo.curvatureLeft +
                  ', R ' +
                  lensesInfo.dioptreRight +
                  ' ' +
                  lensesInfo.curvatureRight}
              </Caption>

              {lensesInfo.swapDates ? (
                <Progress
                  value={lensesProgressValue}
                  style={{
                    height: 4,
                    borderRadius: 2,
                    marginBottom: 16,
                    maxWidth: 200,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                  }}
                />
              ) : (
                ''
              )}
              {lensesInfo.swapDates &&
              lensesInfo.swapDates.length &&
              lensesProgressValue >= 100 ? (
                <Text
                  weight='regular'
                  style={{
                    width: 'fit-content',
                    marginBottom: 0,
                    fontSize: 24,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                  }}
                >
                  Время менять линзы!
                </Text>
              ) : (
                ''
              )}
              <Text
                weight='regular'
                style={{
                  width: 'fit-content',
                  marginBottom: 0,
                  fontSize: 24,
                  marginRight: 'auto',
                  marginLeft: 'auto',
                }}
              >
                {lensesInfo.periodicity + ' дней'}
              </Text>
              <Caption
                weight='regular'
                style={{
                  textAlign: 'center',
                  marginBottom: 16,
                  fontSize: '14px',
                  color: '#909499',
                }}
              >
                Периодичность замены
              </Caption>
              {lensesInfo.swapDates && lensesInfo.swapDates.length ? (
                <div
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: 'fit-content',
                  }}
                >
                  <Scroll dates={lensesInfo.swapDates} />
                </div>
              ) : (
                ''
              )}
              {lensesInfo.swapDates && lensesInfo.swapDates.length ? (
                <div>
                  <Caption
                    weight='regular'
                    style={{
                      textAlign: 'center',
                      // marginBottom: 16,
                      fontSize: '14px',
                      color: '#909499',
                    }}
                  >
                    Последние смены
                  </Caption>
                  <Caption
                    weight='regular'
                    style={{
                      textAlign: 'center',
                      marginBottom: 16,
                      fontSize: '14px',
                      color: '#909499',
                    }}
                  >
                    Для удаления нажмите на дату
                  </Caption>
                </div>
              ) : (
                ''
              )}
              {nextChangeDate ? (
                <Text
                  weight='regular'
                  style={{
                    width: 'fit-content',
                    marginBottom: 0,
                    fontSize: 24,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                  }}
                >
                  {nextChangeDate}
                </Text>
              ) : (
                ''
              )}
              {nextChangeDate ? (
                <Caption
                  weight='regular'
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    color: '#909499',
                  }}
                >
                  Следующая смена линз
                </Caption>
              ) : (
                ''
              )}
            </Div>
          </Div>
        )}

        {/*liquidInfo && (
      <Group header={<Header mode='secondary'>Информация о жидкости</Header>}>
        <Div>
          <Text weight='regular' style={{ marginBottom: 16 }}>
            {'Производитель: ' + liquidInfo.manufacturer}
          </Text>
          <Text weight='regular' style={{ marginBottom: 16 }}>
            {'Название жидкости: ' + liquidInfo.name}
          </Text>
          <div>
            {liquidInfo.swapDates ? (
              <Scroll
                style={{ 'margin-left': 'auto', 'margin-right': 'auto' }}
                dates={liquidInfo.swapDates}
              />
            ) : (
              ''
            )}
            {liquidInfo.swapDates && (
              <Caption
                weight='regular'
                style={{
                  textAlign: 'center',
                  marginBottom: 16,
                  fontSize: '14px',
                  color: '#909499',
                }}
              >
                Последние смены
              </Caption>
            )}
          </div>
        </Div>
        <Div>
          <Button size='l' onClick={() => swapLiquid()}>
            Сменить жидкость
          </Button>
        </Div>
      </Group>
              )*/}
        <Div>
          <Button
            stretched
            size='l'
            mode='secondary'
            onClick={go}
            data-to='addData'
          >
            Изменить информацию
          </Button>
        </Div>
        <Div>
          <Button
            stretched
            size='l'
            mode='secondary'
            onClick={() => {
              changeModal(MODAL_PAGE_SETTINGS);
            }}
          >
            <Icon28Settings />
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
  liquidInfo: PropTypes.shape({
    manufacturer: PropTypes.string,
    name: PropTypes.string,
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
