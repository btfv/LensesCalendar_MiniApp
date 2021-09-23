import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '@vkontakte/vkui';
import ScrollContainer from 'react-indiana-drag-scroll';
import UserActions from '../redux/actions/user.actions';
import { connect } from 'react-redux';

const formatDate = (string) => {
  var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Date(string).toLocaleDateString([], options);
};

const Scroll = ({ dates, removeDate }) => {
  return (
    <ScrollContainer
      style={{
        height: '98px',
        cursor: 'grab',
        overflowY: 'scroll',
        scrollbarWidth: 0,
        '-webkit-mask-image':
          'linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.25))',
        '-webkit-mask-mode': 'alpha',
      }}
    >
      {dates.map((date, index) => (
        <Text
          weight='regular'
          style={{ marginBottom: 14, 'font-size': '24px' }}
          onClick={() => {
            removeDate(date);
          }}
        >
          {formatDate(date)}
        </Text>
      ))}
    </ScrollContainer>
  );
};

Scroll.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  removeDate: UserActions.removeDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Scroll);
