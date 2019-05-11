import { combineReducers } from 'redux'

import ACTIONS from '../constants/ACTIONS'
import user from './user/userReducer'
import nav from './nav/navReducer'
import forms from './forms/formsReducer'
import api from './api/apiReducer'

const appReducers = combineReducers({
  user,
  nav,
  forms,
  api
})

function rootReducer (state, action) {
  let newState = state
  if (action.type === ACTIONS.RESET_APP) newState = undefined
  if (action.type === ACTIONS.LOGOUT_USER) newState = undefined
  return appReducers(newState, action)
}

export default rootReducer
