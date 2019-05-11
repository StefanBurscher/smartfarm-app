import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import MyInputStyle from './MyInput.styles'
import MyTextInput from '../../atoms/MyTextInput/MyTextInput'
import MyText from '../../atoms/MyText/MyText'
import { getMargins } from '../../../utils/styles-util'

export default class MyInput extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    maxLenght: PropTypes.number,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.oneOf([
      'default',
      'number-pad',
      'decimal-pad',
      'numeric',
      'email-address',
      'phone-pad'
    ]),
    returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
    style: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number
    ]),
    autoCapitalize: PropTypes.oneOf([
      'none',
      'sentences',
      'words',
      'characters'
    ]),
    onChange: PropTypes.func, //
    autoCorrect: PropTypes.bool, //
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.string,
      PropTypes.number
    ]), //
    field: PropTypes.string.isRequired, //
    error: PropTypes.string, //
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    margin: PropTypes.string,
    basic: PropTypes.bool,
    large: PropTypes.bool,
    debounce: PropTypes.bool
  }

  static defaultProps = {
    keyboardType: 'default',
    autoFocus: false,
    disabled: false,
    maxLenght: 100,
    autoCapitalize: 'none',
    value: '',
    margin: '0 0 20 0',
    basic: false,
    large: true,
    debounce: false
  }

  constructor (props) {
    super(props)

    this.state = {
      active: false
    }
  }

  onInputFocus = () => {
    const { onFocus } = this.props
    if (onFocus) onFocus()
    this.setState({ active: true })
  }

  onInputBlur = () => {
    const { onBlur } = this.props
    if (onBlur) onBlur()
    this.setState({ active: false })
  }

  getInputStyle = () => {
    if (this.props.basic) return []
    const { disabled } = this.props
    const cmpStyle = MyInputStyle
    const { active } = this.state
    const style = [cmpStyle.inputWrapper]
    if (active) style.push(cmpStyle.activeInput)
    if (disabled) style.push(cmpStyle.disabledInput)

    return style
  }

  render () {
    const { error, margin, large } = this.props
    const inputStyle = this.getInputStyle()
    const cmpStyle = MyTextInput
    const styleWrapper = [
      getMargins(margin),
      cmpStyle.container,
      cmpStyle.trans,
      large ? cmpStyle.fullScreen : {}
    ]
    return (
      <View style={styleWrapper}>
        <View style={inputStyle}>
          <MyTextInput {...this.props} />
        </View>
        {error && (
          <MyText margin='5 0 0 0' color='red' style={{ height: 20 }}>
            {error}
          </MyText>
        )}
      </View>
    )
  }
}
