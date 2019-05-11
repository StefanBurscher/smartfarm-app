import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appActions from '../../../redux/actions'
import MyTextInputStyle from './MyTextInput.styles'

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MyTextInput extends Component {
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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //
    field: PropTypes.string.isRequired, //
    error: PropTypes.string, //
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    debounce: PropTypes.bool
  }

  static defaultProps = {
    keyboardType: 'default',
    autoFocus: false,
    disabled: false,
    maxLenght: 100,
    autoCapitalize: 'none',
    value: '',
    secureTextEntry: false,
    multiline: false,
    numberOfLines: 1,
    debounce: false
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.value !== prevState.propValue) {
      return {
        ...prevState,
        propValue: nextProps.value,
        textValue: nextProps.value
      }
    }
    return null
  }

  constructor (props) {
    super(props)

    this.state = {
      active: false,
      textValue: '',
      propValue: '' // Last forwarded value through props
    }
    this.changeTimer = null
  }

  componentDidMount = () => {
    const { value } = this.props
    this.setState({ textValue: value })
  }

  onChangeText = text => {
    this.setState({ textValue: text })
    const { debounce } = this.props
    if (debounce) {
      clearTimeout(this.changeTimer)
      this.changeTimer = setTimeout(() => this.handleChangeText(text), 750)
    } else {
      this.handleChangeText(text)
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
    this.handleChangeText(this.state.textValue)
  }

  getPlaceholderTextColor = style =>
    StyleSheet.flatten(style.textPlaceholderColor).color // get color from raw json depending on style theme

  handleChangeText = text => {
    const { field, onChange, actions } = this.props
    if (onChange) {
      onChange(field, text)
    } else {
      actions.updateFormField(field, text)
    }
  }

  render () {
    const {
      onSubmitEditing,
      returnKeyType,
      refs,
      multiline,
      numberOfLines,
      theme,
      disabled,
      maxLenght,
      autoFocus,
      placeholder,
      keyboardType,
      secureTextEntry,
      style,
      autoCapitalize
    } = this.props
    const { textValue } = this.state
    const editable = !disabled
    const cmpStyle = MyTextInputStyle
    const placeholderTextColor = this.getPlaceholderTextColor(cmpStyle)

    return (
      <TextInput
        ref={refs}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        style={[cmpStyle.input, style]}
        onChangeText={this.onChangeText}
        value={textValue}
        autoFocus={autoFocus}
        editable={editable}
        autoCapitalize={autoCapitalize}
        maxLength={maxLenght}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid={'rgba(0,0,0,0)'}
      />
    )
  }
}

export default MyTextInput
