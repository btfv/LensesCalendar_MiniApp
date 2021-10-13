import { Caption, Div, Text } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

const HomeElement = ({ value, caption }) => {
  return (
    <Div>
      <Text
        weight='regular'
        style={{
          width: 'fit-content',
          fontSize: 36,
          marginRight: 'auto',
          marginLeft: 'auto',
          marginBottom: '6px',
        }}
      >
        {value}
      </Text>
      <Caption
        weight='regular'
        style={{
          textAlign: 'center',
          fontSize: '16px',
          color: '#909499',
        }}
      >
        {caption}
      </Caption>
    </Div>
  );
};

HomeElement.propTypes = {
  value: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default HomeElement;
