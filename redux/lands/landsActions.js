import ACTIONS from '../../constants/ACTIONS'
import landsService from '../../services/lands-service'
import API from '../../constants/API'
import { Alert } from 'react-native'

export {
  getAllLands,
  getLandDetails,
  getReportDetails,
  getWeather,
  getGraph,
  getRainGraph,
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

function getRainGraph () {
  return async (dispatch, getState) => {
    try {
      const res = await landsService.getRainGraph()
      dispatch({
        type: ACTIONS.GET_RAIN_GRAPH,
        callName: API.GET_RAIN_GRAPH,
        data: res.data
      })
    } catch (err) {}
  }
}

function uploadImage (photo) {
  return async (dispatch, getState) => {
    try {
      const res = await landsService.uploadImage(photo)
      // console.log('res', JSON.stringify(res.data))
      Alert.alert('Report', res.data)
      // alert(res.data.replace(new RegExp('_', 'g'), ' '))
      dispatch({
        type: ACTIONS.TAKE_CAMERA_PHOTO,
        callName: API.TAKE_CAMERA_PHOTO,
        photo
      })
    } catch (err) {}
  }
}
