/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  title: ''
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.CHANGE_HEADER_TITLE:
      return updateObject(state, {title: action.payload} )
  }
  return state;
};

export default reducer;