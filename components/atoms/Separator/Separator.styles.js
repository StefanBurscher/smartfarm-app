// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'

const SeparatorStyle = {
  content: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row'
    // height: 60,
  },
  separator: {
    width: '100%'
  },
  separatorVertical: {
    height: '100%'
  },
  center: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  left: {
    flex: 1,
    marginRight: 10,
    alignItems: 'flex-start'
  },
  right: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-end'
  },
  separatorColor: {
    color: STYLES.COLORS.MEDIUM_GRAY
  }
}

export default SeparatorStyle
