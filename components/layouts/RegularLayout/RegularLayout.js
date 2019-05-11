import React, { Component } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'

import RegularLayoutStyle from './RegularLayout.styles'
import { getPadding } from '../../../utils/styles-util'
import KeyboardShift from '../../../utils/keyboard-shift-util'
import STYLES from '../../../constants/STYLES'

class RegularLayout extends Component {
  static propTypes = {
    padding: PropTypes.string,
    enableParentScroll: PropTypes.bool
  }

  static defaultProps = {
    padding: '20 20 100 20',
    enableParentScroll: true
  }

  render () {
    const { children, padding, enableParentScroll } = this.props
    const style = RegularLayoutStyle
    const paddings = getPadding(padding)
    return (
      <React.Fragment>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          keyboardDismissMode='on-drag'
          scrollEnabled={enableParentScroll}
          style={style.container}
          contentContainerStyle={[{ flexGrow: 1 }, paddings]}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <KeyboardShift>
              <>{children}</>
            </KeyboardShift>
          </SafeAreaView>
        </ScrollView>
      </React.Fragment>
    )
  }
}

export default RegularLayout
