import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root.reducer';

const enhancers = [applyMiddleware(thunk), composeWithDevTools()];

const store = createStore(rootReducer, compose(...enhancers));

export default store;
