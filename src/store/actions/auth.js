import * as actionsTypes from './actionTypes';

export const login = ( payload ) => {
  return {
    type: actionsTypes.LOGIN,
    payload
  }
}