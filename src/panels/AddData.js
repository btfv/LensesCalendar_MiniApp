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
  PanelHeaderClose,
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
      <PanelHeader left={<PanelHeaderClose onClick={go} data-to='home' />}>
        Изменение данных
      </PanelHeader>
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
            <FormItem top='Кривизна левой линзы'>
              <Select
                name='curvatureLeft'
                placeholder='Не выбрана'
                options={(() => {
                  var a = [];
                  for (let i = 70; i <= 90; i = i + 2) {
                    a.push({ value: i / 10, label: i / 10 });
                  }
                  return a;
                })()}
                defaultValue={lensesInfo ? lensesInfo.dioptreLeft : null}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption {...restProps} />
                )}
              />
            </FormItem>
            <FormItem top='Диоптрии левой линзы'>
              <Select
                name='dioptreLeft'
                placeholder='Не выбрана'
                options={(() => {
                  var a = [];
                  for (let i = -15; i <= 15; i = i + 0.25) {
                    a.push({ value: i, label: i });
                  }
                  return a;
                })()}
                defaultValue={lensesInfo ? lensesInfo.curvatureLeft : null}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption {...restProps} />
                )}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormLayoutGroup mode='horizontal'>
            <FormItem top='Кривизна правой линзы'>
              <Select
                name='curvatureRight'
                placeholder='Не выбрана'
                options={(() => {
                  var a = [];
                  for (let i = 70; i <= 90; i = i + 2) {
                    a.push({ value: i / 10, label: i / 10 });
                  }
                  return a;
                })()}
                defaultValue={lensesInfo ? lensesInfo.dioptreRight : null}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption {...restProps} />
                )}
              />
            </FormItem>
            <FormItem top='Дипотрии правой линзы'>
              <Select
                name='dioptreRight'
                placeholder='Не выбрана'
                options={(() => {
                  var a = [];
                  for (let i = -15; i <= 15; i = i + 0.25) {
                    a.push({
                      value: i,
                      label: i,
                    });
                  }
                  return a;
                })()}
                defaultValue={lensesInfo ? lensesInfo.curvatureRight : null}
                renderOption={({ option, ...restProps }) => {
                  return <CustomSelectOption {...restProps} />;
                }}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormItem>
            <Button size='l' stretched type='submit'>
              Сохранить
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
  submitInfo: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  submitInfo: UserActions.addData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddData);
