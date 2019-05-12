import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appActions from '../../../redux/actions'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import MyText from '../../atoms/MyText/MyText'
import MyButton from '../../atoms/MyButton/MyButton'
import apiUtil from '../../../utils/api-util'
import API from '../../../constants/API'
import MyInput from '../../molecules/MyInput/MyInput'
import { KEYBOARD_TYPE } from '../../../constants/UI'

@connect(
  state => ({
    formData: state.forms.formData,
    callsInProgress: state.api.callsInProgress
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SignUpScreen extends React.Component {
  static navigationOptions = () => ({
    headerSameColor: true,
    right: 'login'
  })
  render () {
    const { formData, callsInProgress, actions } = this.props
    const loginLoading = apiUtil.areCallsInProgress(
      [API.LOGIN_USER],
      callsInProgress
    )
    return (
      <RegularLayout>
        <MyText margin='0 0 30 0' align='center' type='H1'>
          Join Us
        </MyText>
        <MyInput
          type='text'
          keyboardType={KEYBOARD_TYPE.EMAIL}
          autoCapitalize='none'
          field='email'
          placeholder='E-mail'
          value={formData.email}
          returnKeyType={'next'}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            this.pass.focus()
          }}
        />
        <MyInput
          type='password'
          field='password'
          placeholder='Password'
          autoCapitalize='none'
          secureTextEntry
          value={formData.password}
          refs={input => {
            this.pass = input
          }}
        />

        <MyButton
          margin='10 0 40 0'
          onPress={this.loginUser}
          loading={loginLoading}
        >
          Register
        </MyButton>
      </RegularLayout>
    )
  }
}

export default SignUpScreen
