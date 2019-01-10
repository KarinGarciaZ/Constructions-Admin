import { combineReducers } from 'redux';
import headerTitleReducer from './headerTitleReducer';

export default combineReducers({
  headerTitle: headerTitleReducer
});