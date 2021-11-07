import React from 'react';
import PropTypes from 'prop-types';

import { Button, Caption, Div, Group, Panel, Text } from '@vkontakte/vkui';
import blister from '../img/blister.svg';
import contact_lense from '../img/contact_lense.svg';
import checking_table from '../img/checking_table.svg';
import eye from '../img/eye.svg';
import './Welcome.scss';

const Welcome = ({ id, go }) => {
  return (
    <Panel id={id}>
      <div
        style={{
          height: '100%',
          width: '100%',
          background: '#2787F5',
          position: 'fixed',
          zIndex: 1,
        }}
      >
        <img src={blister} className='slideInRight anim_1' />
        <img src={contact_lense} className='slideInRight anim_2' />
        <img src={checking_table} className='slideInRight anim_3' />
        <img src={eye} className='slideInRight anim_4' />
      </div>
      <div
        style={{
          margin: 'auto',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        <Text
          style={{
            marginBottom: '16px',
            fontSize: '28px',
            color: '#FFFFFF',
            lineHeight: '32px',
          }}
        >
          Сервис, который уведомляет Вас о необходимости смены линз
        </Text>
        <Button
          onClick={go}
          size='l'
          mode='overlay_primary'
          style={{ width: '200px', marginBottom: '16px' }}
        >
          Ввести данные
        </Button>
        {/* <Caption weight='regular' style={{ color: '#000000BF' }}>
          Нажимая, вы соглашаетесь с правилами
        </Caption> */}
      </div>
    </Panel>
  );
};

Welcome.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Welcome;
