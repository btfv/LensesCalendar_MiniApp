import React from 'react';
import PropTypes from 'prop-types';

import { Panel, ModalCardBase, Button } from '@vkontakte/vkui';
import { Icon56ErrorOutline } from '@vkontakte/icons';
import { CloseApp } from '../services/vk_bridge.service';

const FailedLaunch = ({ id }) => {
  return (
    <Panel id={id}>
      <ModalCardBase
        style={{ width: 450, margin: 'auto' }}
        header='Сервис временно недоступен'
        icon={<Icon56ErrorOutline key='icon' />}
        onClose={() => {
          CloseApp();
        }}
      />
    </Panel>
  );
};

FailedLaunch.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FailedLaunch;
