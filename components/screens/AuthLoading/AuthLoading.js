import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { getSecureStoreKey } from '../../../utils/expo-storage'

export default class AuthLoadingScreen extends React.Component {
  constructor (props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await getSecureStoreKey('userToken')

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    // this.props.navigation.navigate('App')


    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  // Render any loading content that you like here
  render () {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )
  }
}
