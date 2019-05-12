import ACTIONS from '../../constants/ACTIONS'

const initialState = {
  allLands: [],
  landDetails: { reports: [] },
  reportDetails: { parent: {} },
  weather: [],
  graphData: []
}

export default function landsReducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.GET_ALL_LANDS:
      return {
        ...state,
        allLands: action.data
      }
    case ACTIONS.GET_LAND_DETAILS:
      return {
        ...state,
        landDetails: action.data
      }
    case ACTIONS.GET_REPORT_DETAILS:
      return {
        ...state,
        reportDetails: action.data
      }
    case ACTIONS.GET_WEATHER:
      return { ...state, weather: action.data }
    case ACTIONS.GET_GRAPH:
      return { ...state, graphData: action.data }
    default:
      return { ...state }
  }
}
