import ACTIONS from '../../constants/ACTIONS'
import landsService from '../../services/lands-service'
import API from '../../constants/API'

export {
  getAllLands,
  getLandDetails,
  getReportDetails,
  getWeather,
  getGraph,
  uploadImage
}

function getAllLands (formData = {}) {
  return async (dispatch, getState) => {
    try {
      const res = await landsService.getAllLands()
      dispatch({
        type: ACTIONS.GET_ALL_LANDS,
        callName: API.GET_ALL_LANDS,
        data: res
      })
    } catch (err) {}
  }
}

function getLandDetails (landID) {
  return async (dispatch, getState) => {
    try {
      const res = await landsService.getLandDetails(landID)
      dispatch({
        type: ACTIONS.GET_LAND_DETAILS,
        callName: API.GET_LAND_DETAILS,
        data: res
      })
    } catch (err) {}
  }
}

function getReportDetails (reportID) {
  return async (dispatch, getState) => {
    try {
      const res = await landsService.getReportDetails(reportID)
      dispatch({
        type: ACTIONS.GET_REPORT_DETAILS,
        callName: API.GET_REPORT_DETAILS,
        data: res
      })
    } catch (err) {}
  }
}

function getWeather () {
  return async (dispatch, getState) => {
    try {
      const res = await landsService.getWeather()
      dispatch({
        type: ACTIONS.GET_WEATHER,
        callName: API.GET_WEATHER,
        data: res.data
      })
    } catch (err) {}
  }
}

function getGraph () {
  return async (dispatch, getState) => {
    try {
      const res = await landsService.getGraph()
      dispatch({
        type: ACTIONS.GET_GRAPH,
        callName: API.GET_GRAPH,
        data: res.data
      })
    } catch (err) {}
  }
}

function uploadImage (photo) {
  return async (dispatch, getState) => {
    try {
      const res = await landsService.uploadImage(photo)
      console.log('res', res)
      alert(
        'Alert Title',
        'My Alert Msg',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      dispatch({
        type: ACTIONS.TAKE_CAMERA_PHOTO,
        callName: API.TAKE_CAMERA_PHOTO,
        photo
      })
    } catch (err) {}
  }
}
