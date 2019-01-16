/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  form: { }
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ){
    case actionTypes.UPDATE_FORM_STATE:
      return updateObject( state, { form: action.payload } );
  }
  return state;
}

export default reducer;