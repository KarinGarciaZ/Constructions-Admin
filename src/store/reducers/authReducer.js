/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  userInfo : {
    isAuth: false
  }
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ){
    case actionTypes.LOGIN:
      return updateObject( state, { userInfo: action.payload } );
  }
  return state;
}

export default reducer;