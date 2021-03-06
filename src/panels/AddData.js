import React, { useState } from 'react';
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
  CustomSelect,
} from '@vkontakte/vkui';
import UserActions from '../redux/actions/user.actions';
import { connect } from 'react-redux';

const CUSTOM_PERIODICITY_MODE_VALUE = -1;

const AddData = ({
  id,
  go,
  submitInfo,
  lensesInfo,
  liquidInfo,
  successRedirect,
}) => {
  const [isPeriodicityCustomFormOpened, openPeriodicityCustomForm] =
    useState(false);
  const [lensesName, setLensesName] = useState(
    lensesInfo && lensesInfo.name ? lensesInfo.name : undefined
  );

  const [lensesManufacturer, setLensesManufacturer] = useState(
    lensesInfo && lensesInfo.manufacturer ? lensesInfo.manufacturer : undefined
  );
  const [dioptreLeft, setDioptreLeft] = useState(
    lensesInfo ? lensesInfo.dioptreLeft : undefined
  );
  const [dioptreRight, setDioptreRight] = useState(
    lensesInfo ? lensesInfo.dioptreRight : undefined
  );
  const [curvatureLeft, setCurvatureLeft] = useState(
    lensesInfo ? lensesInfo.curvatureLeft : undefined
  );
  const [curvatureRight, setCurvatureRight] = useState(
    lensesInfo ? lensesInfo.curvatureRight : undefined
  );
  const [lensesPeriodicity, setLensesPeriodicity] = useState(
    lensesInfo && lensesInfo.periodicity ? lensesInfo.periodicity : undefined
  );
  const [lensesPeriodicity_custom, setLensesPeriodicity_custom] = useState(
    lensesInfo && lensesInfo.periodicity ? lensesInfo.periodicity : undefined
  );

  const setStateFuncs = {
    lensesName: setLensesName,
    lensesManufacturer: setLensesManufacturer,
    dioptreLeft: setDioptreLeft,
    dioptreRight: setDioptreRight,
    curvatureLeft: setCurvatureLeft,
    curvatureRight: setCurvatureRight,
    lensesPeriodicity: setLensesPeriodicity,
    lensesPeriodicity_custom: setLensesPeriodicity_custom,
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setStateFuncs[name](value);
  };

  const validPeriodicity = (periodicity) => {
    if (periodicity === '') {
      return { valid: false, msg: '?????????????????? ????????' };
    }
    if (periodicity <= 0) {
      return { valid: false, msg: '?????????????????????????? ???????????? ???????? ???????????? ????????' };
    }
    if (!Number.isInteger(+periodicity)) {
      return { valid: false, msg: '?????????????????????????? ???????????? ???????? ?????????? ????????????' };
    }
    return { valid: true };
  };

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          lensesInfo ? <PanelHeaderClose onClick={go} data-to='home' /> : ''
        }
      >
        ?????????????????? ????????????
      </PanelHeader>
      <Group
        header={
          <Header mode='secondary'>
            ?????????????? ???????????????????? ?? ?????????? ???????????? ?? ????????????????
          </Header>
        }
      >
        <FormLayout
          onSubmit={(e) => {
            e.preventDefault();
            const dataToSubmit = {
              lenses: {
                name: lensesName,
                // manufacturer: lensesManufacturer,
                dioptreLeft: dioptreLeft,
                dioptreRight: dioptreRight,
                curvatureLeft: curvatureLeft,
                curvatureRight: curvatureRight,
                periodicity: !isPeriodicityCustomFormOpened
                  ? lensesPeriodicity
                  : lensesPeriodicity_custom,
              },
            };
            submitInfo(dataToSubmit).then(successRedirect);
          }}
        >
          <FormItem top='???????????????? ????????'>
            <Input
              value={lensesName}
              type='text'
              name='lensesName'
              onChange={onChange}
            />
          </FormItem>
          {/* <FormItem top='?????????????????????????? ????????'>
            <Input
              value={lensesManufacturer}
              type='text'
              name='lensesManufacturer'
              onChange={onChange}
            />
          </FormItem> */}
          <FormItem
            top='?????????????? ?????????? (?? ????????)'
            status={
              isPeriodicityCustomFormOpened &&
              lensesPeriodicity_custom !== undefined &&
              !validPeriodicity(lensesPeriodicity_custom).valid
                ? 'error'
                : null
            }
            bottom={
              isPeriodicityCustomFormOpened &&
              lensesPeriodicity_custom !== undefined
                ? validPeriodicity(lensesPeriodicity_custom).msg
                : null
            }
          >
            <CustomSelect
              value={lensesPeriodicity}
              searchable
              name='lensesPeriodicity'
              placeholder='?????????????? ?? ????????'
              filterFn={(value, option) => {
                return (
                  option.value === CUSTOM_PERIODICITY_MODE_VALUE ||
                  option.value.toString().includes(value.replace(/\s/g, '')) ||
                  option.label
                    .toLowerCase()
                    .replace(/\s/g, '')
                    .includes(value.replace(/\s/g, '').toLowerCase())
                );
              }}
              options={(() => {
                var a = [
                  { value: 14, label: '?????? ????????????' },
                  { value: 30, label: '???????? ??????????' },
                  { value: 90, label: '?????? ????????????' },
                  {
                    value: CUSTOM_PERIODICITY_MODE_VALUE,
                    label: '???????? ??????????????',
                  },
                ];
                return a;
              })()}
              renderOption={({ option, ...restProps }) => {
                return <CustomSelectOption {...restProps} />;
              }}
              onChange={(e) => {
                onChange(e);
                if (e.target.value == CUSTOM_PERIODICITY_MODE_VALUE)
                  openPeriodicityCustomForm(true);
                else openPeriodicityCustomForm(false);
              }}
            />
            {isPeriodicityCustomFormOpened ? (
              <Input
                value={lensesPeriodicity_custom}
                style={{ marginTop: '16px' }}
                min={1}
                max={365}
                type='number'
                name='lensesPeriodicity_custom'
                onChange={onChange}
              />
            ) : (
              ''
            )}
          </FormItem>
          <FormLayoutGroup mode='horizontal'>
            <FormItem top='???????????????? ?????????? ??????????'>
              <Select
                value={curvatureLeft}
                name='curvatureLeft'
                placeholder='???? ??????????????'
                options={(() => {
                  var a = [];
                  for (let i = 78; i <= 95; i = i + 1) {
                    a.push({ value: i / 10, label: i / 10 });
                  }
                  return a;
                })()}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption {...restProps} />
                )}
                onChange={onChange}
              />
            </FormItem>
            <FormItem top='???????????????????? ???????? (????????????????) ?????????? ??????????'>
              <Select
                value={dioptreLeft}
                name='dioptreLeft'
                placeholder='???? ??????????????'
                options={(() => {
                  var a = [];
                  for (let i = -20; i <= 20; i = i + 0.25) {
                    a.push({ value: i, label: i });
                  }
                  return a;
                })()}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption {...restProps} />
                )}
                onChange={onChange}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormLayoutGroup mode='horizontal'>
            <FormItem top='???????????????? ???????????? ??????????'>
              <Select
                value={curvatureRight}
                name='curvatureRight'
                placeholder='???? ??????????????'
                options={(() => {
                  var a = [];
                  for (let i = 78; i <= 95; i = i + 1) {
                    a.push({ value: i / 10, label: i / 10 });
                  }
                  return a;
                })()}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption {...restProps} />
                )}
                onChange={onChange}
              />
            </FormItem>
            <FormItem top='???????????????????? ???????? (????????????????) ???????????? ??????????'>
              <Select
                value={dioptreRight}
                name='dioptreRight'
                placeholder='???? ??????????????'
                options={(() => {
                  var a = [];
                  for (let i = -20; i <= 20; i = i + 0.25) {
                    a.push({
                      value: i,
                      label: i,
                    });
                  }
                  return a;
                })()}
                renderOption={({ option, ...restProps }) => {
                  return <CustomSelectOption {...restProps} />;
                }}
                onChange={onChange}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormItem>
            <Button size='l' stretched type='submit'>
              ??????????????????
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
