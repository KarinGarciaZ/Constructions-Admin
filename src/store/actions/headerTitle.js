import * as actionTypes from './actionTypes';

export const changeHeaderTitle = ( payload ) => {
  return {
    type: actionTypes.CHANGE_HEADER_TITLE,
    payload
  }
}