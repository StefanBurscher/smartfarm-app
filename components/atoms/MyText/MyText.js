import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import { getMargins, getScaledFont } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'

class MyText extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['H0', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7']),
    weight: PropTypes.oneOf(['regular', 'bold']),
    color: PropTypes.string,
    margin: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.number, // StyleSheet.create() returns number
      PropTypes.instanceOf(Object)
    ]),
    align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    allCaps: PropTypes.bool,
    onPress: PropTypes.func
  }
  static defaultProps = {
    type: 'H5',
    margin: '0 0 0 0',
    style: {},
    align: 'left',
    allCaps: false
  }

  getFontSize = type => getScaledFont(STYLES.FONTSIZE[type])

  getFontWeightForType (type) {
    if (type === 'H1') return 'bold'

    return 'regular'
  }

  getFontStyle = () => {
    const { type, margin, color, align } = this.props
    const fontSize = { fontSize: this.getFontSize(type) }
    const colorStyle = color ? { color } : { color: STYLES.COLORS.DARK_GRAY }
    const marginStyle = getMargins(margin)
    const alignStyle = { textAlign: align }

    return [fontSize, colorStyle, marginStyle, alignStyle]
  }

  render () {
    const { children, style, allCaps, onPress } = this.props
    const fontStyle = this.getFontStyle()
    return (
      <Text style={[fontStyle, style]} onPress={onPress}>
        {allCaps ? children.toUpperCase() : children}
      </Text>
    )
  }
}

export default MyText
