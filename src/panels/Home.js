import React from 'react';
import PropTypes from 'prop-types';

import {
  Panel,
  PanelHeader,
  Header,
  Group,
  Cell,
  Div,
  Avatar,
  Text,
  Button,
} from '@vkontakte/vkui';
import UserActions from '../redux/actions/user.actions';
import { connect } from 'react-redux';

function formatDate(string) {
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return new Date(string).toLocaleDateString([], options);
}

const Home = ({
  id,
  go,
  fetchedUser,
  lensesInfo,
  liquidInfo,
  swapLenses,
  swapLiquid,
}) => (
  <Panel id={id}>
    <PanelHeader>Lenses Calendar App</PanelHeader>
    {fetchedUser && (
      <Group
        header={
          <Header mode='secondary'>User Data Fetched with VK Bridge</Header>
        }
      >
        <Cell
          before={
            fetchedUser.photo_200 ? (
              <Avatar src={fetchedUser.photo_200} />
            ) : null
          }
          description={
            fetchedUser.city && fetchedUser.city.title
              ? fetchedUser.city.title
              : ''
          }
        >
          {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
        </Cell>
      </Group>
    )}

    {lensesInfo && (
      <Group header={<Header mode='secondary'>Lenses Info</Header>}>
        <Div>
          <Text weight='regular' style={{ marginBottom: 16 }}>
            {lensesInfo.manufacturer}
          </Text>
          <Text weight='regular' style={{ marginBottom: 16 }}>
            {lensesInfo.name}
          </Text>
          <Text weight='regular' style={{ marginBottom: 16 }}>
            L {lensesInfo.dioptreLeft + ' ' + lensesInfo.curvatureLeft}
          </Text>
          <Text weight='regular' style={{ marginBottom: 16 }}>
            R {lensesInfo.dioptreRight + ' ' + lensesInfo.curvatureRight}
          </Text>
          <Text weight='regular' style={{ marginBottom: 16 }}>
            Swap Dates:
          </Text>
          {lensesInfo.swapDates.map((date, index) => (
            <Text weight='regular' style={{ marginBottom: 16 }}>
              {(index + 1).toString() + '. ' + formatDate(date)}
            </Text>
          ))}
        </Div>
      </Group>
    )}

    {liquidInfo && (
      <Group header={<Header mode='secondary'>Liquid Info</Header>}>
        <Div>
          <Text weight='regular' style={{ marginBottom: 16 }}>
            {liquidInfo.manufacturer}
          </Text>
          <Text weight='regular' style={{ marginBottom: 16 }}>
            {liquidInfo.name}
          </Text>
          <Text weight='regular' style={{ marginBottom: 16 }}>
            Swap Dates:
          </Text>
          {liquidInfo.swapDates.map((date, index) => (
            <Text weight='regular' style={{ marginBottom: 16 }}>
              {(index + 1).toString() + '. ' + formatDate(date)}
            </Text>
          ))}
        </Div>
        <Div>
          <Button
            size='l'
            style={{ float: 'left' }}
            onClick={() => swapLenses()}
          >
            Swap Lenses
          </Button>
          <Button
            size='l'
            style={{ float: 'right' }}
            onClick={() => swapLiquid()}
          >
            Swap Liquid
          </Button>
        </Div>
      </Group>
    )}
    <Div>
      <Button
        stretched
        size='l'
        mode='secondary'
        onClick={go}
        data-to='addData'
      >
        Add data
      </Button>
    </Div>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  lensesInfo: PropTypes.shape({
    manufacturer: PropTypes.string,
    name: PropTypes.string,
    periodicity: PropTypes.number,
    dioptreLeft: PropTypes.number,
    dioptreRight: PropTypes.number,
    curvatureLeft: PropTypes.number,
    curvatureRight: PropTypes.number,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
