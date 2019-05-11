import { Dimensions, PixelRatio, StyleSheet, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export {
  getMargins,
  getPadding,
  getScaledFont,
  widthPercentageToDP,
  heightPercentageToDP
}

/**
 * Formats margins from CSS style declaration
 *
 * @param {string} margin - eg. '10 20 10 20'
 * @returns {Object}
 */
function getMargins (margin) {
  if (!margin) return getMargins('0 0 0 0')

  const margins = margin.split(' ')
  if (margins.length !== 4) return getMargins()

  return StyleSheet.create({
    margins: {
      marginTop: Number(margins[0]),
      marginRight: Number(margins[1]),
      marginBottom: Number(margins[2]),
      marginLeft: Number(margins[3])
    }
  }).margins
}

/**
 * Formats padding from CSS style declaration
 *
 * @param {string} padding - eg. '10 20 10 20'
 * @returns {Object}
 */
function getPadding (padding) {
  if (!padding) return getPadding('0 0 0 0')

  const paddings = padding.split(' ')
  if (paddings.length !== 4) return getPadding()

  return StyleSheet.create({
    paddings: {
      paddingTop: Number(paddings[0]),
      paddingRight: Number(paddings[1]),
      paddingBottom: Number(paddings[2]),
      paddingLeft: Number(paddings[3])
    }
  }).paddings
}

/**
 * Calculates screen percentage in pixels from device width
 *
 * @param {number} widthPercent
 * @returns {number}
 */
function widthPercentageToDP (widthPercent) {
  const screenWidth = width
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent)
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
}

/**
 * Calculates screen percentage in pixels from device height
 *
 * @param {number} heightPercent
 * @returns {number}
 */
function heightPercentageToDP (heightPercent) {
  const screenHeight = height
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent)
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
}

/**
 * Gets scaled font size for different devices or different themes
 *
 * @param {number} fontSize
 * @retunrs {number}
 */

function getScaledFont (fontSize) {
  const scale = width / 320
  const newSize = fontSize * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}
