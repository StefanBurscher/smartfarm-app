import axios from 'axios'
import { Constants } from 'expo'

import { getSecureStoreKey } from '../utils/expo-storage'

import store from '../redux/store'
import * as actions from '../redux/actions'

const {
  SECURITY_STORAGE_AUTH_KEY,
  // CLIENT_VERSION,
  // ENV
} = Constants.manifest.extra
let token

export default {
  initInterceptors,
  areCallsInProgress,
  parseValidationErrors
}

/**
 * Initializes axios interceptors for every HTTP request
 */
function initInterceptors () {
  axios.interceptors.request.use(
    async req => {
      const newRequest = { ...req }

      // get token from secure store
      try {
        const storageToken = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY)
        if (token !== storageToken) token = storageToken

        if (token != null) {
          newRequest.headers = {
            ...newRequest.headers,
            authorization: `Bearer ${token}`
          }
        }
      } catch (err) {
      }

      // if (ENV === 'PRODUCTION' || ENV === 'PREPROD') {
      //   newRequest.headers['X-Client-Version'] = CLIENT_VERSION
      // } else {
      //   newRequest.headers['X-Client-Version'] = ENV
      // }

      return newRequest
    },
    error => Promise.reject(error)
  )

  axios.interceptors.response.use(
    res => {},
    async error => {
      const defaultMsg = 'Oops, it looks like something went wrong.'
      const err = error.response
        ? error.response.data
        : {
          type: 'Unknown Server Error',
          msg: defaultMsg,
          raw_error: error
        }

      if (!err.msg) err.msg = defaultMsg

      if (err.status === 401 && err.slug === 'SESSION_EXPIRED') {
        store.dispatch(actions.expireSession())
        await store.dispatch(await actions.logoutUser())
      }

      if (err.status === 403 && err.slug === 'USER_SUSPENDED') {
        const { profile } = store.getState().user
        if (profile && profile.id) {
          await store.dispatch(await actions.logoutUser())
        }
        await store.dispatch(await actions.showMessage('error', err.msg))
      }
      if (error.response.status === 429) {
        store.dispatch(actions.navigateTo('LockedAccount'))
      }

      return Promise.reject(err)
    }
  )
}

/**
 * Checks if api calls are in progress
 *
 * @param {Array} callsToCheck - array of api call names from API.js
 * @param {Array} callsInProgress - calls currently in progress
 * @returns {boolean}
 */
function areCallsInProgress (callsToCheck, callsInProgress = undefined) {
  const calls = callsInProgress || store.getState().api.callsInProgress
  return !!calls.filter(cip => callsToCheck.indexOf(cip) !== -1).length
}

/**
 * Parses validation errors from server
 *
 * @param {Object} serverError - error response from the server
 * @returns {Object} validationErrors - key/value pairs for errors, key is the field name, value is the error message from server
 */
function parseValidationErrors (serverError) {
  const errKeys = Object.keys(serverError.raw_error)
  const validationErrors = {}

  errKeys.forEach(ek => {
    validationErrors[ek] = serverError.raw_error[ek].msg
  })

  return validationErrors
}
