import { combineReducers } from 'redux';
import AppReducer from './app.reducer';
import UserReducer from './user.reducer';
const rootReducer = combineReducers({ AppReducer, UserReducer });

export default rootReducer;
