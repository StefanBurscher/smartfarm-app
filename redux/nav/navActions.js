import { NavigationActions, StackActions } from 'react-navigation'
import ACTIONS from '../../constants/ACTIONS'

let _navigator

export {
  navigateTo,
  navigateBack,
  setTopLevelNavigator,
  getActiveScreen,
  getNavigator,
  setActiveScreen,
  resetToFlow
}

function setActiveScreen (screenName) {
  return dispatch => {
    dispatch({ type: ACTIONS.SET_ACTIVE_SCREEN, payload: { screenName } })
  }
}

/**
 * Gets current active screen
 * @returns {string} - active screen name
 */
function getActiveScreen () {
  if (!_navigator._navState) return false
  const index = _navigator._navState.index
  const index1 = _navigator._navState.routes[index].index
  return _navigator._navState.routes[index].routes[index1].routeName
}

/**
 * Gets current active screen
 * @returns {Object} - navigator
 */
function getNavigator () {
  return _navigator
}

/**
 * Sets _navigator
 * @param {Object} navigatorRef
 */
function setTopLevelNavigator (navigatorRef) {
  _navigator = navigatorRef
}

/**
 * Navigates to a screen
 * @param {string} routeName - name of the screen
 * @param {Object} params - parameters for the next screen
 */
function navigateTo (routeName, params) {
  return () => {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    )
  }
}

/**
 * Navigates back
 */
function navigateBack (backScreenName) {
  return () => {
    _navigator.dispatch(NavigationActions.back())
  }
}

function resetToFlow (flow) {
  return () => {
    _navigator.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: flow })]
      })
    )
  }
}
