import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import MyButtonStyle from "./MyButton.styles";
import { getMargins } from '../../../utils/styles-util';
import MyText from '../MyText/MyText';
import Spinner from '../Spinner/Spinner';

const buttonSizes = ['small', 'medium'];

class MyButton extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    margin: PropTypes.string,
    basic: PropTypes.bool,
    size: PropTypes.oneOf(buttonSizes),
    textColor: PropTypes.string,
    ghost: PropTypes.bool
  };

  static defaultProps = {
    disabled: false,
    loading: false,
    margin: '0 0 0 0',
    basic: false,
    size: 'medium',
    textColor: '',
    ghost: false
  }

  getButtonStyle = (style) => {
    const { margin, disabled, basic, size, ghost } = this.props;
    const buttonStyles = [style.container, style[`${size}Container`]];

    buttonStyles.push(getMargins(margin));

    if (disabled) buttonStyles.push(style.disabledButton);
    if (basic) buttonStyles.push(style.basicButton);
    if (ghost) buttonStyles.push(style.ghostButton)
    return buttonStyles;
  }

  getTitleStyle = (style) => {
    const { disabled, basic, size, textColor, ghost } = this.props;
    const titleStyle = [style.baseTitle, style[`${size}Title`]];
    if (disabled) titleStyle.push(style.disabledTitleColor);
    if (basic) titleStyle.push(style.basicTitle);
    if (ghost) titleStyle.push(style.ghostTitle)
    if (textColor) titleStyle.push({ color: textColor })

    return titleStyle;
  }

  renderLoader = () => {
    const style = MyButtonStyle();
    const buttonStyle = this.getButtonStyle(style);

    return (
      <View style={buttonStyle}>
        <Spinner size={30} />
      </View>
    )
  }

  renderButton = () => {
    const { children, style } = this.props;
    const celBtnStyle = MyButtonStyle;
    const buttonStyle = this.getButtonStyle(celBtnStyle);
    const titleStyle = this.getTitleStyle(celBtnStyle);

    return (
      <View style={[buttonStyle, style]}>
        {!!children && <MyText style={titleStyle}>{children}</MyText>}
      </View>
    )
  }

  render() {
    const { disabled, loading, basic, onPress } = this.props;
    const Loader = this.renderLoader;
    const Button = this.renderButton;
    const activeOpacity = basic ? 0.3 : 0.8;

    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={activeOpacity} style={{ alignItems: 'center' }}>
        {loading ? <Loader /> : <Button />}
      </TouchableOpacity>
    );
  }
}

export default MyButton
