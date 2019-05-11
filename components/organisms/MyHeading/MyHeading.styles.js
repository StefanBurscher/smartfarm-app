import { StatusBar, Platform } from 'react-native'

import STYLES from '../../../constants/STYLES'

const MyHeadingStyle = {
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60
  },

  center: {
    alignSelf: 'center',
    justifyContent: 'center'
  },

  left: {
    flex: 1,
    alignItems: 'flex-start'
  },

  right: {
    flex: 1,
    alignItems: 'flex-end'
  },

  headingBackground: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    ...Platform.select({
      android: {
        borderColor: '#E9E9E9',
        borderBottomWidth: 2
      },
      ios: {
        ...STYLES.SHADOW_STYLES
      }
    }),
    backgroundColor: STYLES.COLORS.WHITE
  },

  transparentBackground: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0
  },

  sameBackground: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY
  },

  profilePicture: {
    width: 36,
    height: 36,
    borderRadius: 18,

    ...Platform.select({
      android: {
        borderColor: '#E9E9E9',
        borderWidth: 1
      },
      ios: {
        ...STYLES.SHADOW_STYLES
      }
    })
  },

  button: {
    borderRadius: 17,
    overflow: 'hidden',
    borderColor: 'black'
  }
}

export default MyHeadingStyle
