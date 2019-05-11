import React from 'react'
import { createStackNavigator } from 'react-navigation'
import SignInScreen from '../components/screens/SignIn/SignInScreen'
import MyHeading from '../components/organisms/MyHeading/MyHeading'

export default createStackNavigator(
  {
    SignIn: SignInScreen
  },
  {
    defaultNavigationOptions: {
      header: props => <MyHeading {...props} />
    }
  }
)
