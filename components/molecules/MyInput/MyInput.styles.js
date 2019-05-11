import { Platform, StyleSheet } from 'react-native'
import { getPadding, getScaledFont } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'

const fontSize = getScaledFont(STYLES.FONTSIZE.H4)
const MyInputStyle = {
  container: {
    borderRadius: 8,
    backgroundColor: STYLES.COLORS.WHITE
  },
  fullScreen: {
    width: '100%'
  },
  trans: {
    backgroundColor: 'transparent'
  },
  inputWrapper: {
    ...StyleSheet.flatten(getPadding('12 16 15 16')),
    height: 50,
    borderRadius: 8,
    backgroundColor: STYLES.COLORS.WHITE,
    ...Platform.select({
      android: {
        borderColor: '#E9E9E9',
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.5,
        borderBottomWidth: 2
      },
      ios: {
        ...STYLES.SHADOW_STYLES
      }
    })
  },
  input: {
    height: 23,
    fontSize,
    color: STYLES.COLORS.DARK_GRAY
  },
  disabledInput: {
    opacity: 0.6
  },
  activeInput: {
    borderWidth: 1,
    borderColor: STYLES.COLORS.DARK_GRAY_OPACITY,
    shadowOpacity: 0
  },
  textPlaceholderColor: {
    color: STYLES.COLORS.MEDIUM_GRAY
  }
}

export default MyInputStyle
