import { Constants } from 'expo'

import ACTIONS from '../../constants/ACTIONS'
import API from '../../constants/API'
import { startApiCall, apiError } from '../api/apiActions'
import { navigateTo } from '../nav/navActions'
// import { showMessage } from '../ui/uiActions'
// import { initAppData } from '../app/appActions'
import {
  deleteSecureStoreKey,
  setSecureStoreKey
} from '../../utils/expo-storage'
import usersService from '../../services/users-service'

const { SECURITY_STORAGE_AUTH_KEY } = Constants.manifest.extra

export { loginUser, registerUser, registerUserSuccess, logoutUser }

/**
 * Logs the user in with email and password
 */
function loginUser () {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms

      dispatch(startApiCall(API.LOGIN_USER))
      const res = await usersService.login({
        email: formData.email,
        password: formData.password
      })

      // add token to expo storage
      await setSecureStoreKey(
        SECURITY_STORAGE_AUTH_KEY,
        res.data.auth0.id_token
      )

      // await dispatch(initAppData())
      const user = res.data.user

      dispatch({
        type: ACTIONS.LOGIN_USER_SUCCESS,
        callName: API.LOGIN_USER,
        tokens: res.data.auth0,
        user
      })
      dispatch(navigateTo('Home'))
    } catch (err) {
      // dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.LOGIN_USER, err))
    }
  }
}

/**
 * Registers a user signed up with email
 */
function registerUser () {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms

      const user = {
        email: formData.email,
        password: formData.password
      }

      dispatch(startApiCall(API.REGISTER_USER))
      const res = await usersService.register(user)

      // add token to expo storage
      await setSecureStoreKey(
        SECURITY_STORAGE_AUTH_KEY,
        res.data.auth0.id_token
      )
      // await dispatch(initAppData())

      dispatch({
        type: ACTIONS.REGISTER_USER_SUCCESS,
        user: res.data.user
      })
      dispatch(navigateTo('Home'))
    } catch (err) {
      // dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.REGISTER_USER, err))
    }
  }
}

/**
 * 
 */
function registerUserSuccess (data) {
  return {
    type: ACTIONS.REGISTER_USER_SUCCESS,
    callName: API.REGISTER_USER,
    user: data.user
  }
}

/**
 * 
 */
function logoutUser () {
  return async dispatch => {
    try {
      await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY)

      dispatch({
        type: ACTIONS.LOGOUT_USER
      })
      await dispatch(navigateTo('Welcome'))
    } catch (err) {}
  }
}
