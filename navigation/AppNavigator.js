import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import AuthStack from './AuthStack'
import AuthLoadingScreen from '../components/screens/AuthLoading/AuthLoading'

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: MainTabNavigator
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
)
