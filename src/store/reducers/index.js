import { combineReducers } from 'redux';
import headerTitleReducer from './headerTitleReducer';
import formStateReducer from './formStateReducer';

export default combineReducers({
  headerTitle: headerTitleReducer,
  formState: formStateReducer
});