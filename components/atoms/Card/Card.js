import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'

import { getPadding, getMargins } from '../../../utils/styles-util'

import CardStyle from './Card.styles'
class Card extends React.Component {
  static propTypes = {
    margin: PropTypes.string,
    opacity: PropTypes.number,
    padding: PropTypes.string,
    color: PropTypes.string,
    onPress: PropTypes.func,
    size: PropTypes.oneOf(['full', 'half', 'third'])
  }
  static defaultProps = {
    margin: '8 0 8 0',
    padding: '12 12 12 12',
    size: 'full',
    opacity: 1,
    styles: {},
    onPress: null,
    color: 'white'
  }

  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  closeCard = () => this.setState({ open: false })

  render () {
    const {
      margin,
      padding,
      size,
      opacity,
      children,
      styles,
      onPress,
      color
    } = this.props
    const style = CardStyle
    const paddingStyles = getPadding(padding)
    const marginStyles = getMargins(margin)
    const opacityStyles = { opacity }
    const cardStyles = [
      style.card,
      paddingStyles,
      marginStyles,
      opacityStyles,
      style[size],
      styles,
      { backgroundColor: color, overflow: 'hidden' }
    ]

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} style={cardStyles}>
          {children}
        </TouchableOpacity>
      )
    }

    return <View style={cardStyles}>{children}</View>
  }
}

export default Card
