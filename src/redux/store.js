import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root.reducer';

var enhancers;
if (process.env.NODE_ENV === 'development')
  enhancers = [applyMiddleware(thunk), composeWithDevTools()];
else enhancers = [applyMiddleware(thunk)];
const store = createStore(rootReducer, compose(...enhancers));

export default store;
