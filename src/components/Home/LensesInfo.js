import { Caption, Div, Progress, Text } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import Scroll from './SwapDatesHistory';
import HomeElement from './HomeElement';
import { FormatDate, AddDays, GetDayAddition } from '../../utils/utils.js';

const LensesInfo = ({ info }) => {
  if (info.periodicity <= 0) {
    info.periodicity = null;
  }
  const lensesProgressValue =
    info.swapDates && info.swapDates.length && info.periodicity
      ? Math.min(
          (100 * (Date.now() - Date.parse(info.swapDates[0]))) /
            (info.periodicity * 24 * 60 * 60 * 1000),
          100
        )
      : 0;
  const nextChangeDate =
    info.swapDates && info.swapDates.length && info.periodicity
      ? FormatDate(AddDays(info.swapDates[0], info.periodicity))
      : null;

  return (
    <Div>
      {nextChangeDate !== null ? (
        <HomeElement value={nextChangeDate} caption='Следующая смена линз' />
      ) : (
        ''
      )}
      {/* <HomeElement
        value={info.name}
        caption={
          'L ' +
          info.dioptreLeft +
          ' ' +
          info.curvatureLeft +
          ', R ' +
          info.dioptreRight +
          ' ' +
          info.curvatureRight
        }
      /> */}

      {info.swapDates && info.swapDates.length && info.periodicity ? (
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
      {info.swapDates && info.swapDates.length && lensesProgressValue >= 100 ? (
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
      {info.periodicity ? (
        <HomeElement
          value={info.periodicity + ' ' + GetDayAddition(info.periodicity)}
          caption='Периодичность замены'
        />
      ) : (
        ''
      )}
      {info.swapDates && info.swapDates.length ? (
        <Scroll dates={info.swapDates} />
      ) : (
        ''
      )}
    </Div>
  );
};

LensesInfo.propTypes = {
  info: PropTypes.shape({
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

export default LensesInfo;
