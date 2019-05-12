import React from 'react'
import { Icon } from 'expo'

import Colors from '../constants/Colors'

export default class TabBarIcon extends React.Component {
  render () {
    let color = this.props.focused
      ? Colors.tabIconSelected
      : Colors.tabIconDefault
    if (this.props.color) color = this.props.color
    const size = this.props.size
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={size || 26}
        style={{ marginBottom: -3, ...this.props.style }}
        color={color}
      />
    )
  }
}
