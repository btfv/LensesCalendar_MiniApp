import React, { useState } from 'react';
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
  FormLayout,
  FormItem,
  Input,
  FormLayoutGroup,
} from '@vkontakte/vkui';
import UserActions from '../redux/actions/user.actions';
import { connect } from 'react-redux';

const AddData = ({
  id,
  go,
  fetchedUser,
  submitInfo,
  lensesInfo,
  liquidInfo,
}) => {
  return (
    <Panel id={id}>
      <PanelHeader>Add data</PanelHeader>
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
      <Group
        header={
          <Header mode='secondary'>
            Add info about your lenses and liquid
          </Header>
        }
      >
        <FormLayout
          onSubmit={(e) => {
            e.preventDefault();
            var {
              lensesName,
              lensesManufacturer,
              dioptreLeft,
              dioptreRight,
              curvatureLeft,
              curvatureRight,
              lensesPeriodicity,
              liquidName,
              liquidManufacturer,
            } = e.target;
            const dataToSubmit = {
              lenses: {
                name: lensesName.value,
                manufacturer: lensesManufacturer.value,
                dioptreLeft: dioptreLeft.value,
                dioptreRight: dioptreRight.value,
                curvatureLeft: curvatureLeft.value,
                curvatureRight: curvatureRight.value,
                periodicity: lensesPeriodicity.value,
              },
              liquid: {
                name: liquidName.value,
                manufacturer: liquidManufacturer.value,
              },
            };
            submitInfo(dataToSubmit).then(() => {
              const e = {};
              e.currentTarget ={};
              e.currentTarget.dataset = {};
              e.currentTarget.dataset.to = 'home';
              go(e);
            });
          }}
        >
          <FormItem top='Lenses name'>
            <Input type='text' name='lensesName' />
          </FormItem>
          <FormItem top='Manufacturer'>
            <Input type='text' name='lensesManufacturer' />
          </FormItem>
          <FormItem top='Periodicity (days)'>
            <Input type='text' name='lensesPeriodicity' />
          </FormItem>
          <FormLayoutGroup mode='horizontal'>
            <FormItem top='Dioptre Left'>
              <Input type='number' name='dioptreLeft' step='0.01' />
            </FormItem>
            <FormItem top='Curvature Left'>
              <Input type='number' name='curvatureLeft' step='0.01' />
            </FormItem>
          </FormLayoutGroup>
          <FormLayoutGroup mode='horizontal'>
            <FormItem top='Dioptre Right'>
              <Input type='number' name='dioptreRight' step='0.01' />
            </FormItem>
            <FormItem top='Curvature Right'>
              <Input type='number' name='curvatureRight' step='0.01' />
            </FormItem>
          </FormLayoutGroup>
          <FormItem top='Liquid name'>
            <Input type='text' name='liquidName' />
          </FormItem>
          <FormItem top='Manufacturer'>
            <Input type='text' name='liquidManufacturer' />
          </FormItem>
          <FormItem>
            <Button size='l' stretched type='submit'>
              Add Data
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </Panel>
  );
};

AddData.propTypes = {
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
    lensesManufacturer: PropTypes.string,
    name: PropTypes.string,
    periodicity: PropTypes.number,
    dioptreLeft: PropTypes.number,
    dioptreRight: PropTypes.number,
    curvatureLeft: PropTypes.number,
    curvatureRight: PropTypes.number,
    swapDates: PropTypes.arrayOf(PropTypes.string),
  }),
  liquidInfo: PropTypes.shape({
    lensesManufacturer: PropTypes.string,
    name: PropTypes.string,
    swapDates: PropTypes.arrayOf(PropTypes.string),
  }),
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  submitInfo: UserActions.addData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddData);
