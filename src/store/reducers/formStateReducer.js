/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  formElements: { }
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ){
    case actionTypes.UPDATE_FORM_STATE:
      return updateObject( state, { formElements: action.payload } );
  }
  return state;
}

export default reducer;