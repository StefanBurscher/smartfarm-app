import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  BottomTabBar
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../components/screens/Home/HomeScreen'
import { defaultNavigationOptions, transitionConfig } from './navigationConfig'
import STYLES from '../constants/STYLES'
import CameraScreen from '../components/screens/CameraScreen/CameraScreen'
import LandsScreen from '../components/screens/Lands/LandsScreen'
import ReportDetails from '../components/screens/ReportDetails/ReportDetails'
import Analytics from '../components/screens/Analytics/Analytics'

const TabBarComponent = props => <BottomTabBar {...props} />

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Lands: LandsScreen,
    ReportDetails: ReportDetails,
    Analytics: Analytics
  },
  {
    defaultNavigationOptions: {
      ...defaultNavigationOptions
    },
    transitionConfig
  }
)

HomeStack.navigationOptions = {
  tabBarLabel: 'Lands',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-leaf` : 'md-leaf'}
    />
  )
}

const CameraStack = createStackNavigator(
  {
    Camera: CameraScreen
  },
  {
    defaultNavigationOptions: {
      ...defaultNavigationOptions
    },
    transitionConfig
  }
)

CameraStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'Camera') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Disease check',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
      />
    )
  }
}

export default createBottomTabNavigator(
  {
    HomeStack,
    CameraStack
  },
  {
    tabBarComponent: props => (
      <TabBarComponent {...props} style={tabBarStyle} />
    ),
    tabBarOptions: {
      activeTintColor: STYLES.COLORS.MAIN_COLOR,
      style: {
        // TabBar background
        borderColor: 'red'
      }
    },

    defaultNavigationOptions: {
      ...defaultNavigationOptions
    },
    transitionConfig
  }
)

const tabBarStyle = {
  borderTopWidth: 0,
  ...Platform.select({
    android: {
      borderColor: '#E9E9E9',
      borderTopmWidth: 2
    },
    ios: {
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.03,
      shadowRadius: 3,
      elevation: 3
    }
  })
}
