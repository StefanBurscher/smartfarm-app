import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Camera, Permissions, ImageManipulator, ImagePicker } from 'expo'

import * as appActions from '../../../redux/actions'
import CameraScreenStyle from './CameraScreen.styles'
// import Icon from '../../atoms/Icon/Icon'
import STYLES from '../../../constants/STYLES'
import API from '../../../constants/API'
import MyText from '../../atoms/MyText/MyText'
import TabBarIcon from '../../TabBarIcon'
import MyButton from '../../atoms/MyButton/MyButton'

const { height, width } = Dimensions.get('window')

@connect(
  state => ({
    cameraType: state.camera.cameraType,
    cameraRollLastPhoto: state.camera.cameraRollPhotos[0],
    photo: state.camera.photo,
    cameraField: state.camera.cameraField,
    cameraHeading: state.camera.cameraHeading,
    cameraCopy: state.camera.cameraCopy,
    mask: state.camera.mask
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CameraScreen extends Component {
  static propTypes = {
    cameraField: PropTypes.string,
    cameraHeading: PropTypes.string,
    cameraCopy: PropTypes.string,
    cameraType: PropTypes.oneOf(['front', 'back']),
    photo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Object)
    ]),
    mask: PropTypes.oneOf(['circle', 'document']),
    onSave: PropTypes.func
  }

  static defaultProps = {
    cameraField: 'lastPhoto',
    cameraHeading: 'Take Photo',
    mask: 'circle'
  }

  static navigationOptions = () => ({
    title: 'Camera',
    customBack: 'Home'
  })

  static defaultProps = {
    cameraField: 'lastPhoto',
    cameraHeading: 'Take Photo'
  }

  constructor (props) {
    super(props)

    this.state = {
      hasCameraPermission: false,
      hasInitialPhoto: !!props.photo,
      size: {
        width,
        height
      }
    }
  }

  async componentWillMount () {
    await this.getCameraPermissions()
    await this.getCameraRollPermissions()
  }

  getCameraPermissions = async () => {
    const { actions } = this.props
    let perm = await Permissions.getAsync(Permissions.CAMERA)

    if (perm.status !== 'granted') {
      perm = await Permissions.askAsync(Permissions.CAMERA)
    }

    if (perm.status === 'granted') {
      this.setState({ hasCameraPermission: perm.status === 'granted' })
    } else {
      actions.navigateBack()
    }
  }

  getCameraRollPermissions = async () => {
    const { actions, cameraRollLastPhoto } = this.props
    let perm = await Permissions.getAsync(Permissions.CAMERA_ROLL)

    if (perm.status !== 'granted') {
      perm = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    }

    console.log('perm', perm)

    if (perm.status === 'granted') {
      if (!cameraRollLastPhoto) actions.getCameraRollPhotos()
      this.setState({ hasCameraPermission: perm.status === 'granted' })
    } else {
      // actions.showMessage(
      //   'warning',
      //   'It looks like you denied Mysius app access to your camera roll. Please enable it in your phone settings.'
      // )
    }
  }

  pickImage = async () => {
    const { actions, mask, navigation } = this.props
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [STYLES.imageSizes[mask].width, STYLES.imageSizes[mask].height]
    })
    if (result.cancelled) {
      return
    }
    actions.navigateTo('ConfirmCamera', {
      onSave: navigation.getParam('onSave')
    })
    actions.takeCameraPhoto(result)
  }

  takePhoto = async () => {
    if (!this.camera) return

    const { actions, mask, navigation, cameraType } = this.props
    try {
      if (!this.state.hasCameraPermission) {
        return await this.getCameraPermissions()
      }

      actions.startApiCall(API.TAKE_CAMERA_PHOTO)
      await actions.navigateTo('ConfirmCamera', {
        onSave: navigation.getParam('onSave')
      })
      const photo = await this.camera.takePictureAsync()
      const { size } = this.state

      const imageManipulations = [
        {
          resize: {
            width: size.width,
            height: size.height
          }
        },
        {
          crop: {
            originX: (size.width - STYLES.imageSizes[mask].width) / 2,
            originY: (size.height - STYLES.imageSizes[mask].height) / 2,
            width: STYLES.imageSizes[mask].width,
            height: STYLES.imageSizes[mask].height
          }
        }
      ]

      if (cameraType === 'front') {
        imageManipulations.push({
          flip: { horizontal: cameraType === 'front' }
        })
      }

      const resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        imageManipulations,
        { compress: 0.95, format: 'jpg' }
      )

      actions.takeCameraPhoto(resizedPhoto)
    } catch (err) {}
  }

  render () {
    const { cameraType, actions, cameraRollLastPhoto } = this.props
    const style = CameraScreenStyle
    console.log('cameraRollLastPhoto', cameraRollLastPhoto)
    return (
      <Camera
        ref={ref => {
          this.camera = ref
        }}
        onLayout={event => {
          this.setState({ size: event.nativeEvent.layout })
        }}
        style={style.camera}
        type={Camera.Constants.Type[cameraType]}
      >
        <SafeAreaView style={style.bottomView}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16
            }}
          >
            <TouchableOpacity
              style={{ flex: 1, alignItems: 'center' }}
              onPress={this.pickImage}
            >
              {cameraRollLastPhoto && (
                <Image
                  source={{ uri: cameraRollLastPhoto.node.image.uri }}
                  resizeMode='cover'
                  style={{ width: 40, height: 40 }}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1, alignItems: 'center' }}
              onPress={this.takePhoto}
            >
              <TabBarIcon name={`ios-camera`} size={50} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, alignItems: 'center' }}
              onPress={() => {
                this.setState({ ratio: '4:3' }, actions.flipCamera)
              }}
            >
              <TabBarIcon name={`ios-repeat`} size={40} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Camera>
    )
  }
}

export default CameraScreen
