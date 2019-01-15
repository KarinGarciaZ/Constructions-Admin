import { combineReducers } from 'redux';
import headerTitleReducer from './headerTitleReducer';
import formStateReducer from './formStateReducer';
import authReducer from './authReducer';

export default combineReducers({
  headerTitle: headerTitleReducer,
  formState: formStateReducer,
  auth: authReducer
});