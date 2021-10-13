import React from 'react';
import PropTypes from 'prop-types';

import { Caption, Div, Text } from '@vkontakte/vkui';
import ScrollContainer from 'react-indiana-drag-scroll';
import { connect } from 'react-redux';
import AlertPopup from '../AlertPopup';
import AppActions from '../../redux/actions/app.actions';
import UserActions from '../../redux/actions/user.actions';

const formatDate = (number) => {
  var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Date(number).toLocaleDateString([], options);
};

const SwapDatesHistory = ({ dates, removeDate, openPopout }) => {
  const containerHeight = Math.min(98, 32 * dates.length);
  return (
    <Div>
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 'fit-content',
        }}
      >
        <ScrollContainer
          style={{
            height: containerHeight + 'px',
            cursor: 'grab',
            overflowY: 'scroll',
            scrollbarWidth: 0,
            WebkitMaskImage:
              'linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.25))',
            WebkitMaskMode: 'alpha',
          }}
        >
          {dates.map((date, index) => (
            <Text
              weight='regular'
              style={{ marginBottom: 14, fontSize: '24px' }}
              onClick={() => {
                openPopout(
                  <AlertPopup
                    onClick={() => removeDate(date)}
                    onClose={() => openPopout(null)}
                    header='Удаление даты'
                    text={
                      'Вы уверены, что хотите удалить ' + formatDate(date) + '?'
                    }
                  />
                );
              }}
            >
              {formatDate(date)}
            </Text>
          ))}
        </ScrollContainer>
      </div>
      <div>
        <Caption
          weight='regular'
          style={{
            textAlign: 'center',
            // marginBottom: 16,
            fontSize: '16px',
            color: '#909499',
          }}
        >
          Последние смены
        </Caption>
        <Caption
          style={{
            textAlign: 'center',
            // marginBottom: 16,
            fontSize: '16px',
            color: '#909499',
          }}
        >
          Для удаления нажмите на дату
        </Caption>
      </div>
    </Div>
  );
};

SwapDatesHistory.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  removeDate: UserActions.removeDate,
  openPopout: AppActions.setPopout,
};

export default connect(mapStateToProps, mapDispatchToProps)(SwapDatesHistory);
