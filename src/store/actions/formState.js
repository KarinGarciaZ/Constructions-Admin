import * as actionTypes from './actionTypes';

export const updateFormState = ( payload ) => {
  return {
    type: actionTypes.UPDATE_FORM_STATE,
    payload
  }
}