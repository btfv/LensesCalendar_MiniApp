import { Alert } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

const AlertPopup = ({ onClick, onClose, header, text }) => {
  return (
    <Alert
      actions={[
        {
          title: 'Отмена',
          autoclose: true,
          mode: 'cancel',
        },
        {
          title: 'Удалить',
          autoclose: true,
          mode: 'destructive',
          action: onClick,
        },
      ]}
      actionsLayout='horizontal'
      onClose={onClose}
      header={header}
      text={text}
    />
  );
};

AlertPopup.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertPopup;
