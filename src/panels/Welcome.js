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
          background: '#2975CC',
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
          maxWidth: '500px',
        }}
      >
        <Text style={{ marginBottom: '16px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium
          rutrum est ut mollis. Nam malesuada, ligula eget blandit ornare, massa
          nibh ultricies tortor, volutpat auctor mauris nibh non quam. Donec ac
          lacinia libero. Nunc fringilla molestie lorem, eget fermentum neque
          elementum id. Vestibulum gravida a mi ac feugiat.
        </Text>
        <Button
          onClick={go}
          size='l'
          mode='overlay_primary'
          style={{ width: '200px', marginBottom: '16px' }}
        >
          Продолжить
        </Button>
        <Caption weight='regular' style={{ color: '#000000BF' }}>
          Нажимая, вы соглашаетесь с правилами сервиса
        </Caption>
      </div>
    </Panel>
  );
};

Welcome.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Welcome;
