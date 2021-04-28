import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { connect } from 'react-redux';

import Home from './panels/Home';
import AppActions from './redux/actions/app.actions';
import UserActions from './redux/actions/user.actions';
import UserServices from './redux/services/user.service';

const App = (props) => {
  const { spin, startSpinner, stopSpinner, data, getData } = props;

  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const paramsToObject = (entries) => {
    const result = {};
    for (const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  };

  useEffect(() => {
    UserServices.auth(paramsToObject(params)).then(getData);
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      startSpinner();
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      stopSpinner();
    }
    if (process.env.NODE_ENV === 'production') fetchData();
  }, []);
  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };
  return (
    <AdaptivityProvider>
      <AppRoot>
        <View
          activePanel={activePanel}
          popout={spin ? <ScreenSpinner size="large" /> : null}
        >
          <Home
            id="home"
            fetchedUser={fetchedUser}
            lensesInfo={data.lenses}
            liquidInfo={data.liquid}
            go={go}
          />
        </View>
      </AppRoot>
    </AdaptivityProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    spin: state.AppReducer.spin,
    data: state.UserReducer.data,
  };
};

const mapDispatchToProps = {
  startSpinner: AppActions.startSpinner,
  getData: UserActions.getData,
  stopSpinner: AppActions.stopSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
