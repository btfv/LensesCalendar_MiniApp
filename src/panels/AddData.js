import React from 'react';
import PropTypes from 'prop-types';

import {
  Panel,
  PanelHeader,
  Header,
  Group,
  Div,
  Button,
  FormLayout,
  FormItem,
  Input,
  FormLayoutGroup,
  Select,
  CustomSelectOption,
} from '@vkontakte/vkui';
import UserActions from '../redux/actions/user.actions';
import { connect } from 'react-redux';

const AddData = ({
  id,
  go,
  submitInfo,
  lensesInfo,
  liquidInfo,
  successRedirect,
}) => {
  return (
    <Panel id={id}>
      <PanelHeader>Изменение данных</PanelHeader>
      <Group
        header={
          <Header mode='secondary'>
            Введите информацию о ваших линзах и жидкости
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
              // liquidName,
              // liquidManufacturer,
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
              // liquid: {
              //   name: liquidName.value,
              //   manufacturer: liquidManufacturer.value,
              // },
            };
            submitInfo(dataToSubmit).then(successRedirect);
          }}
        >
          <FormItem top='Название линз'>
            <Input
              type='text'
              name='lensesName'
              defaultValue={
                lensesInfo && lensesInfo.name ? lensesInfo.name : ''
              }
            />
          </FormItem>
          <FormItem top='Производитель линз'>
            <Input
              type='text'
              name='lensesManufacturer'
              defaultValue={
                lensesInfo && lensesInfo.manufacturer
                  ? lensesInfo.manufacturer
                  : ''
              }
            />
          </FormItem>
          <FormItem top='Частота смены (в днях)'>
            <Input
              type='text'
              name='lensesPeriodicity'
              defaultValue={
                lensesInfo && lensesInfo.periodicity
                  ? lensesInfo.periodicity
                  : ''
              }
            />
          </FormItem>
          <FormLayoutGroup mode='horizontal'>
            <FormItem top='Диоптрии левой линзы'>
              <Select
                name='dioptreLeft'
                placeholder='Не выбрана'
                options={(() => {
                  var a = [];
                  for (let i = 80; i <= 90; i = i + 2) {
                    a.push({ value: i / 10, label: i / 10 });
                  }
                  return a;
                })()}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption {...restProps} />
                )}
              />
            </FormItem>
            <FormItem top='Кривизна левой линзы'>
              <Select
                name='curvatureLeft'
                placeholder='Не выбрана'
                options={(() => {
                  var a = [];
                  for (let i = -15; i <= 15; i = i + 0.25) {
                    a.push({ value: i, label: i });
                  }
                  return a;
                })()}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption {...restProps} />
                )}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormLayoutGroup mode='horizontal'>
            <FormItem top='Диоптрии правой линзы'>
              <Select
                name='dioptreRight'
                placeholder='Не выбрана'
                options={(() => {
                  var a = [];
                  for (let i = 80; i <= 90; i = i + 2) {
                    a.push({ value: i / 10, label: i / 10 });
                  }
                  return a;
                })()}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption {...restProps} />
                )}
              />
            </FormItem>
            <FormItem top='Кривизна правой линзы'>
              <Select
                name='curvatureRight'
                placeholder='Не выбрана'
                options={(() => {
                  var a = [];
                  for (let i = -15; i <= 15; i = i + 0.25) {
                    a.push({ value: i, label: i });
                  }
                  return a;
                })()}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption {...restProps} />
                )}
              />
            </FormItem>
          </FormLayoutGroup>
          {/*<FormItem top='Название жидкости'>
            <Input
              type='text'
              name='liquidName'
              defaultValue={
                liquidInfo && liquidInfo.name ? liquidInfo.name : ''
              }
            />
          </FormItem>
          <FormItem top='Производитель жидкости'>
            <Input
              type='text'
              name='liquidManufacturer'
              defaultValue={
                liquidInfo && liquidInfo.manufacturer
                  ? liquidInfo.manufacturer
                  : ''
              }
            />
          </FormItem>*/}
          <FormItem>
            <Button size='l' stretched type='submit'>
              Сохранить
            </Button>
          </FormItem>
        </FormLayout>
        {liquidInfo || lensesInfo ? (
          <Div>
            <Button
              stretched
              size='l'
              mode='secondary'
              onClick={go}
              data-to='home'
            >
              Назад
            </Button>
          </Div>
        ) : (
          ''
        )}
      </Group>
    </Panel>
  );
};

AddData.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  successRedirect: PropTypes.func.isRequired,
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
  submitInfo: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  submitInfo: UserActions.addData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddData);
