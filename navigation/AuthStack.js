import React from 'react'
import { createStackNavigator } from 'react-navigation'
import SignInScreen from '../components/screens/SignIn/SignInScreen'
import MyHeading from '../components/organisms/MyHeading/MyHeading'
import SignUpScreen from '../components/screens/SignUp/SignUp'
import { defaultNavigationOptions, transitionConfig } from './navigationConfig'

export default createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen
  },
  {
    defaultNavigationOptions: {
      ...defaultNavigationOptions
    },
    transitionConfig
  }
)
