import ACTIONS from '../../constants/ACTIONS'
import landsService from '../../services/lands-service'
import API from '../../constants/API'

export { getAllLands, getLandDetails, getReportDetails, getWeather }

function getAllLands (formData = {}) {
  return async (dispatch, getState) => {
    try {
      const res = await landsService.getAllLands()
      console.log('res', res)
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
      console.log('TCL: res', res)
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
      console.log('TCL: res', res)
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
