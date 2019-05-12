import axios from 'axios'
// import apiUrl from './api-url'

const landsService = {
  getReportsForLand,
  getAllLands,
  getLandDetails,
  getReportDetails,
  getWeather,
  getGraph,
  uploadImage,
  getRainGraph,
  kure
}

const POLYGON_ID = '5cd6eff7d86170001b090bce'
const APP_ID = 'c11c89ad50e72bd2654f0b7207ec6404'

// Thursday, April 11, 2019 4:19:31 PM GMT+02:00 DST
const START_TIME = '1554992371'
// Saturday, May 11, 2019 4:19:31 PM GMT+02:00 DST
const END_TIME = '1557584371'

const lands = [
  {
    id: 1,
    image: 'https://i.imgur.com/Tg4DTku.png',
    name: 'Vojvodina Grape',
    location: 'Čurug'
  },
  {
    id: 2,
    image: 'https://i.imgur.com/fjsGKxe.png',
    name: 'Shamrock paradise',
    location: 'Golubinci'
  },
  {
    id: 3,
    image: 'https://i.imgur.com/hCKUHDK.png',
    name: 'Corn Field',
    location: 'Ševica'
  }
]

const reports = [
  {
    id: 1,
    name: 'Report 2',
    status: 'pending',
    date: '11.5.2019',
    image: 'https://i.imgur.com/fjsGKxe.png'
  },
  {
    id: 2,
    name: 'Report 1',
    status: 'healthy',
    date: '8.4.2019',
    image: 'https://i.imgur.com/Tg4DTku.png'
  },
  {
    id: 3,
    name: 'Report 1',
    status: 'diseased',
    date: '4.5.2019',
    image: 'https://i.imgur.com/1Na4bMi.png',
    disease: 'Bacterial spot',
    recommendations: [
      {
        level: 1,
        message:
          'Apply sulfur sprays or copper-based weekly to prevent its spread.'
      }
    ]
  },
  {
    id: 4,
    name: 'Report 1',
    status: 'diseased',
    date: '7.5.2019',
    image: 'https://i.imgur.com/Qd0ys9q.png',
    disease: 'Early Blight',
    recommendations: [
      {
        level: 1,
        message:
          'Apply copper-based fungicides every 7-10 days for as long as needed.'
      }
    ]
  },
  {
    id: 5,
    name: 'Report 2',
    status: 'diseased',
    date: '9.5.2019',
    image: 'https://i.imgur.com/9uGqbka.png',
    disease: 'Leaf Mold',
    recommendations: [
      {
        level: 1,
        message: 'Apply a fungacide spray weekly.'
      }
    ]
  }
]

const land_reports = [
  { landID: 1, reports: [5, 2] },
  { landID: 2, reports: [1, 4] },
  { landID: 3, reports: [3] }
]

function getReportsForLand (landID) {
  const reports = []
  land_reports
    .find(list => list.landID === landID)
    .reports.map(report => reports.push(getReportDetailsOnly(report)))
  return reports
  return axios.post(`${apiUrl}/users/register`, user)
}

function getAllLands (id) {
  return lands
  return axios.post(`${apiUrl}/users/register`, user)
}

function getLandDetails (landID) {
  const land = lands.find(land => land.id === landID)
  land.reports = getReportsForLand(landID)
  return land
  return axios.post(`${apiUrl}/users/register`, user)
}

function getReportDetailsOnly (reportID) {
  return reports.find(report => report.id === reportID)
  return axios.post(`${apiUrl}/users/register`, user)
}

function getReportDetails (reportID) {
  let reportsData = reports.find(report => report.id === reportID)
  land_reports.find(list => {
    if (list.reports.find(report => report === reportID)) {
      reportsData.parent = getLandDetails(list.landID)
    }
  })
  return reportsData
  return axios.post(`${apiUrl}/users/register`, user)
}

function getWeather () {
  return axios.get(
    'https://samples.openweathermap.org/agro/1.0/weather/forecast?polyid=' +
      POLYGON_ID +
      '&appid=' +
      APP_ID
  )
}

function getGraph () {
  return axios.get(
    'https://samples.agromonitoring.com/agro/1.0/ndvi/history?polyid=' +
      POLYGON_ID +
      '&start=' +
      START_TIME +
      '&end=' +
      END_TIME +
      '&appid=' +
      APP_ID
  )
}

function getRainGraph () {
  return axios.get(
    'https://samples.openweathermap.org/agro/1.0/soil/history?polyid=' +
      POLYGON_ID +
      '&start=' +
      START_TIME +
      '&end=' +
      END_TIME +
      '&appid=' +
      APP_ID
  )
}

async function kure () {
  // TODO
  const THRESHOLD = '184'
  console.log('EVCO kure')

  // TODO
  // Current weather data by polygon
  // The Weather data update depends on a type of your account
  const WEATHER_URL =
    'https://samples.openweathermap.org/agro/1.0/weather?polyid=' +
    POLYGON_ID +
    '&appid=' +
    APP_ID
  console.log('WEATHER_URL', WEATHER_URL)
  let res = await axios.get(WEATHER_URL)
  console.log('WEATHER_URL', JSON.stringify(res.data))
  // Forecast weather data by polygon
  // 5-day forecast includes weather data every 3 hours
  const WEATHER_FORECAST_URL =
    'https://samples.openweathermap.org/agro/1.0/weather/forecast?polyid=' +
    POLYGON_ID +
    '&appid=' +
    APP_ID
  res = await axios.get(WEATHER_FORECAST_URL)
  console.log('WEATHER_FORECAST_URL', JSON.stringify(res.data))
  // Historical weather data by polygon
  // Historical weather data archive has a 1-hour step
  const WEATHER_HISTORICAL_URL =
    'https://samples.openweathermap.org/agro/1.0/weather/history?polyid=' +
    POLYGON_ID +
    '&start=' +
    START_TIME +
    '&end=' +
    END_TIME +
    '&&appid=' +
    APP_ID
  res = await axios.get(WEATHER_HISTORICAL_URL)
  console.log('WEATHER_HISTORICAL_URL', JSON.stringify(res.data))

  // Detailed historical data for analysis and comparison vegetation of one season to another
  // NDVI is calculated based on a combination of imageries from Landsat, Sentinel and MODIS with daily updating
  // NDVI (Normalized Difference Vegetation Index), EVI (Enhanced Vegetation Index)
  // are the most common indicators for assessing vegetation progress over time
  const NDVI_HISTORY_URL =
    'https://samples.agromonitoring.com/agro/1.0/ndvi/history?polyid=' +
    POLYGON_ID +
    '&start=' +
    START_TIME +
    '&end=' +
    END_TIME +
    '&appid=' +
    APP_ID
  res = await axios.get(NDVI_HISTORY_URL)
  console.log('NDVI_HISTORY_URL', JSON.stringify(res.data))
  // Accumulated temperature by polygon
  const ACCUMULATED_TEMPERATURE_URL =
    'https://samples.openweathermap.org/agro/1.0/weather/history/accumulated_temperature?polyid=' +
    POLYGON_ID +
    '&threshold=' +
    THRESHOLD +
    '&start=' +
    START_TIME +
    '&end=' +
    END_TIME +
    '&appid=' +
    APP_ID
  res = await axios.get(ACCUMULATED_TEMPERATURE_URL)
  console.log('ACCUMULATED_TEMPERATURE_URL', JSON.stringify(res.data))
  // Accumulated precipitation by polygon
  const ACCUMULATED_PRECIPITATION_URL =
    'https://samples.openweathermap.org/agro/1.0/weather/history/accumulated_precipitation?polyid=' +
    POLYGON_ID +
    '&start=' +
    START_TIME +
    '&end=' +
    END_TIME +
    '&appid=' +
    APP_ID
  res = await axios.get(ACCUMULATED_PRECIPITATION_URL)
  console.log('ACCUMULATED_PRECIPITATION_URL', JSON.stringify(res.data))
  // Current soil data by polygon
  // Current soil data is updated 2 times a day. The soil temperature is provided only in Kelvins
  const SOIL_DATA_URL =
    'https://samples.openweathermap.org/agro/1.0/soil?polyid=' +
    POLYGON_ID +
    '&appid=' +
    APP_ID
  res = await axios.get(SOIL_DATA_URL)
  console.log('SOIL_DATA_URL', JSON.stringify(res.data))
  // Historical soil data by polygon
  // Soil data collection is two times a day with a 12-hour period. Soil historical data available from February 2018
  const SOIL_HISTORY_URL =
    'https://samples.openweathermap.org/agro/1.0/soil/history?polyid=' +
    POLYGON_ID +
    '&start=' +
    START_TIME +
    '&end=' +
    END_TIME +
    '&appid=' +
    APP_ID
  res = await axios.get(SOIL_HISTORY_URL)
  console.log('SOIL_HISTORY_URL', JSON.stringify(res.data))
  // Current UVI data by polygon
  const UVI_DATA_URL =
    'https://samples.openweathermap.org/agro/1.0/uvi?polyid=' +
    POLYGON_ID +
    '&appid=' +
    APP_ID
  res = await axios.get(UVI_DATA_URL)
  console.log('UVI_DATA_URL', JSON.stringify(res.data))
  // Forecast UVI data by polygon
  const UVI_FORECAST_URL =
    'https://samples.openweathermap.org/agro/1.0/uvi/forecast?polyid=' +
    POLYGON_ID +
    '&appid=' +
    APP_ID
  res = await axios.get(UVI_FORECAST_URL)
  console.log('UVI_FORECAST_URL', JSON.stringify(res.data))
  // Historical UVI data by polygon
  const UVI_HISTORICAL_URL =
    'https://samples.openweathermap.org/agro/1.0/uvi/history?polyid=' +
    POLYGON_ID +
    '&start=' +
    START_TIME +
    '&end=' +
    END_TIME +
    '&appid=' +
    APP_ID
  res = await axios.get(UVI_HISTORICAL_URL)
  console.log('UVI_HISTORICAL_URL', JSON.stringify(res.data))
  // Get info for one polygon
  const POLYGON_INFO_URL =
    'https://samples.openweathermap.org/agro/1.0/polygons/' +
    POLYGON_ID +
    '?appid=' +
    APP_ID
  res = await axios.get(POLYGON_INFO_URL)
  console.log('POLYGON_INFO_URL', JSON.stringify(res.data))
}

function uploadImage (photo) {
  const formData = new FormData()
  formData.append('image', {
    name: 'front.jpg',
    type: 'image/jpg',
    uri: photo.uri
  })
  console.log('photo.uri', photo.uri)
  return axios.post('http://52.232.106.165:5000', formData)
}

export default landsService
