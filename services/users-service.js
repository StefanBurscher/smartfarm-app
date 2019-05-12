import axios from 'axios'
import apiUrl from './api-url'

const usersService = {
  register,
  login,
  getPersonalInfo
}

/**
 * Registers a user with email/password
 *
 * @param {Object} user
 * @param {Object} user.first_name
 * @param {Object} user.last_name
 * @param {Object} user.email
 * @param {Object} user.password
 * @param {Object} user.referral_link_id
 * @return {Promise}
 */
function register (user) {
  return axios.post(`${apiUrl}/users/register`, user)
}

/**
 * Logs a user with email/password
 *
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.password
 * @return {Promise}
 */
function login ({ email, password }) {
  return axios.post(`${apiUrl}/users/login`, {
    email,
    password
  })
}

/**
 * Get profile info for logged in user
 *
 * @return {Promise}
 */
function getPersonalInfo () {
  return axios.get(`${apiUrl}/me`)
}

export default usersService
