import { combineReducers } from 'redux';
import AppReducer from './app.reducer';
import UserReducer from './user.reducer';
import ModalReducer from './modal.reducer'
const rootReducer = combineReducers({ AppReducer, UserReducer, ModalReducer });

export default rootReducer;
