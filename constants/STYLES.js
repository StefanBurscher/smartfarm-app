// refactored
const COLORS = {
  WHITE: '#fff',
  WHITE_OPACITY5: 'rgba(255,255,255,0.5)',
  WHITE_OPACITY3: 'rgba(255,255,255,0.3)',
  CELSIUS: '#3F51AB', // prov: change name!
  DARK_HEADER: '#1F2E3D',
  DARK_BACKGROUND: '#151E27',

  // style guide colors
  LIGHT_GRAY: '#F3F3F3',
  MEDIUM_GRAY: '#737A82',
  MEDIUM_GRAY1: 'rgba(115,122,130,0.1)',
  MEDIUM_GRAY3: 'rgba(115,122,130,0.3)',
  GRAY: '#BBBFC2',
  DARK_GRAY: '#3D4853',
  DARK_GRAY3: 'rgba(61, 72, 83, 0.3)',
  DARK_GRAY6: 'rgba(61, 72, 83, 0.6)',
  DARK_GRAY7: 'rgba(61, 72, 83, 0.7)',
  DARK_GRAY_OPACITY: 'rgba(61, 72, 83, 0.15)',
  CELSIUS_BLUE: '#4156A6',
  GREEN: '#4fb895',
  GREEN_OPACITY: 'rgba(79,184,149,0.15)',
  ORANGE: '#e19f30',
  RED: '#ef461a'
}

const imageSizes = {
  circle: {
    width: 250,
    height: 250
  },
  document: {
    width: 300,
    height: 183
  }
}

const SHADOW_STYLES = {
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.03,
  shadowRadius: 3,
  elevation: 3
}

const FONTSIZE = {
  H0: 44,
  H1: 40,
  H2: 26,
  H3: 21,
  H4: 18,
  H5: 16,
  H6: 14,
  H7: 12,
  H8: 10,
}

export default {
  COLORS,
  FONTSIZE,
  imageSizes,
  SHADOW_STYLES
}

// export {
//   COLORS,
//   FONTSIZE
// }
