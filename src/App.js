import React, { useState, useEffect } from 'react';
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { connect } from 'react-redux';

import Home from './panels/Home';
import AddData from './panels/AddData';
import Modal from './panels/Modal';

import { InitApp } from './services/app.service';
import {
  PANELS_CHANGEDATA,
  PANELS_FAILEDLAUNCH,
  PANELS_HOME,
  PANELS_WELCOME,
} from './constants/panels.constants';
import AppActions from './redux/actions/app.actions';
import FailedLaunch from './panels/FailedLaunch';
import Welcome from './panels/Welcome';

const App = (props) => {
  const { spin, data, alertModal, activePanel, setActivePanel } = props;

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };
  useEffect(InitApp, []);
  const popout = spin ? <ScreenSpinner size='large' /> : alertModal;
  return (
    <AdaptivityProvider>
      <AppRoot>
        <View activePanel={activePanel} popout={popout} modal={<Modal />}>
          <Home
            id={PANELS_HOME}
            lensesInfo={data.lenses}
            liquidInfo={data.liquid}
            go={go}
          />
          <AddData
            id={PANELS_CHANGEDATA}
            lensesInfo={data.lenses}
            liquidInfo={data.liquid}
            go={go}
            successRedirect={() => setActivePanel(PANELS_HOME)}
          />
          <FailedLaunch id={PANELS_FAILEDLAUNCH} />
          <Welcome id={PANELS_WELCOME} go={() => setActivePanel(PANELS_CHANGEDATA)} />
        </View>
      </AppRoot>
    </AdaptivityProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    spin: state.AppReducer.spin,
    data: state.UserReducer.data,
    alertModal: state.AppReducer.popout,
    activePanel: state.AppReducer.activePanel,
  };
};

const mapDispatchToProps = {
  setActivePanel: AppActions.setActivePanel,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
