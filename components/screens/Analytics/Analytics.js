import React from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import * as appActions from '../../../redux/actions'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import MyText from '../../atoms/MyText/MyText'
import Card from '../../atoms/Card/Card'
import AnalyticsStyle from './Analytics.styles'
import TabBarIcon from '../../TabBarIcon'
import Separator from '../../atoms/Separator/Separator'
import moment from 'moment'

const data = [
  {
    dt: 1534723200,
    source: 'l8',
    zoom: 13,
    dc: 100,
    cl: 0.16,
    data: {
      std: 0.1558458159825856,
      p75: 0.7262991514983845,
      min: 0.17311303041682313,
      max: 0.8387096774193549,
      median: 0.60759000472567,
      p25: 0.474027202361513,
      num: 8374,
      mean: 0.5979920916568334,
    },
  },
  {
    dt: 1534550400,
    source: 's2',
    zoom: 13,
    dc: 100,
    cl: 0.33,
    data: {
      std: 0.19002321764183236,
      p75: 0.7302165420400225,
      min: 0.04225352112676056,
      max: 0.8485061511423551,
      median: 0.600048181161166,
      p25: 0.41276725314594553,
      num: 8374,
      mean: 0.5722233078041272,
    },
  },
  {
    dt: 1534118400,
    source: 's2',
    zoom: 13,
    dc: 100,
    cl: 0.32,
    data: {
      std: 0.1610778805080775,
      p75: 0.6504396292371343,
      min: 0.07059545733578883,
      max: 0.7959629023458811,
      median: 0.5986452161675848,
      p25: 0.4059588530538272,
      num: 8374,
      mean: 0.5398032157383524,
    },
  },
  {
    dt: 1533686400,
    source: 's2',
    zoom: 13,
    dc: 100,
    cl: 23.74,
    data: {
      std: 0.07784875370943578,
      p75: 0.47594494645171703,
      min: 0.14221048660882685,
      max: 0.5924753212888806,
      median: 0.43929997830774925,
      p25: 0.3554764169674657,
      num: 8374,
      mean: 0.4147295978848868,
    },
  },
  {
    dt: 1533340800,
    source: 'l8',
    zoom: 13,
    dc: 100,
    cl: 2.57,
    data: {
      std: 0.06877484154818174,
      p75: 0.49666957004316853,
      min: 0.19348778960551033,
      max: 0.6325764043025439,
      median: 0.4418460310530795,
      p25: 0.3839027896242279,
      num: 8374,
      mean: 0.4376387956082076,
    },
  },
  {
    dt: 1533254400,
    source: 's2',
    zoom: 13,
    dc: 100,
    cl: 0.41,
    data: {
      std: 0.11760029611688189,
      p75: 0.5509448600655704,
      min: 0.06707317073170732,
      max: 0.7438808087974459,
      median: 0.4373221255198456,
      p25: 0.35388397127357274,
      num: 8374,
      mean: 0.44389595970387385,
    },
  },
  {
    dt: 1532822400,
    source: 's2',
    zoom: 13,
    dc: 100,
    cl: 100,
    data: {
      std: 0.020099336473203427,
      p75: 0.19864676290628844,
      min: 0.1022514071294559,
      max: 0.25558410753113264,
      median: 0.1804887879672865,
      p25: 0.168141592920354,
      num: 8374,
      mean: 0.18293261606980807,
    },
  },
  {
    dt: 1532736000,
    source: 'l8',
    zoom: 13,
    dc: 100,
    cl: 0.31,
    data: {
      std: 0.09168479360048216,
      p75: 0.535081774645342,
      min: 0.19342359767891681,
      max: 0.6808510638297872,
      median: 0.4120686456274323,
      p25: 0.36946939847353316,
      num: 8374,
      mean: 0.4429756835672701,
    },
  },
  {
    dt: 1532390400,
    source: 's2',
    zoom: 13,
    dc: 100,
    cl: 0.77,
    data: {
      std: 0.19998952785279778,
      p75: 0.6725332519285552,
      min: -0.021505376344086023,
      max: 0.8587684069611781,
      median: 0.612582565287817,
      p25: 0.38398992138563326,
      num: 8374,
      mean: 0.5546349020491114,
    },
  },
  {
    dt: 1531958400,
    source: 's2',
    zoom: 13,
    dc: 100,
    cl: 1.28,
    data: {
      std: 0.17822791893529094,
      p75: 0.6531753376647265,
      min: 0.044186046511627906,
      max: 0.8342449859108239,
      median: 0.5331216043835838,
      p25: 0.36406676471993166,
      num: 8374,
      mean: 0.512485948857468,
    },
  },
  {
    dt: 1531353600,
    source: 'l8',
    zoom: 13,
    dc: 100,
    cl: 0.28,
    data: {
      std: 0.12801462144710635,
      p75: 0.5948140561347002,
      min: 0.035058430717863104,
      max: 0.7320127079050645,
      median: 0.5088731773375744,
      p25: 0.3836356300017636,
      num: 8374,
      mean: 0.48547563429961904,
    },
  },
  {
    dt: 1531094400,
    source: 's2',
    zoom: 13,
    dc: 100,
    cl: 1.4,
    data: {
      std: 0.16890736263743802,
      p75: 0.6332434660536501,
      min: -0.02753737214791503,
      max: 0.7664495845497418,
      median: 0.46708573097665806,
      p25: 0.31839655013469637,
      num: 8374,
      mean: 0.46213044228713007,
    },
  },
  {
    dt: 1530662400,
    source: 's2',
    zoom: 13,
    dc: 100,
    cl: 1.7,
    data: {
      std: 0.16892999527457972,
      p75: 0.6204237925014136,
      min: 0.00909090909090909,
      max: 0.76442721791559,
      median: 0.39298542589870855,
      p25: 0.30223000332099836,
      num: 8374,
      mean: 0.446557994457704,
    },
  },
]
@connect(
  state => ({
    weather: state.lands.weather,
    graphData: state.lands.graphData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
export default class Analytics extends React.Component {
  static navigationOptions = () => ({
    title: 'Analytics',
  })

  componentDidMount() {
    const { actions } = this.props
    actions.getGraph()
    actions.getWeather()
  }

  getMedians = () => {
    const { graphData } = this.props

    const result = []
    graphData.map(graph => {
      result.push({ value: graph.data.median, date: graph.dt })
    })
    return result
  }

  renderWeather = () =>
    this.props.weather.map(item => (
      <Card key={item.id} padding="0 0 0 0" key={item.dt}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 60, height: 60, marginTop: 10 }}
            resizeMode="contain"
            source={{
              uri: `http://openweathermap.org/img/w/${
                item.weather[0].icon
              }.png`,
            }}
          />
          <View style={{ justifyContent: 'center' }}>
            <MyText type="H3" margin={'0 0 0 5'}>
              {item.weather[0].description}
            </MyText>
            <MyText type="H5" margin={'0 0 0 5'}>
              {item.wind.speed} m/s clouds: {item.clouds.all}%
            </MyText>
          </View>
        </View>
      </Card>
    ))

  interpolateTimeseries(data, fitCount) {
    let linearInterpolate = function(before, after, atPoint) {
      return [
        { value: before.value, date: before.date },
        {
          value: Math.ceil(
            before.value + (after.value - before.value) * atPoint
          ),
          date: Math.ceil(before.date + (after.date - before.date) * atPoint),
        },
      ]
    }

    let newData = []
    let springFactor = Number((data.length - 1) / (fitCount - 1))
    newData[0] = data[0] // for new allocation

    for (let i = 1; i < fitCount - 1; i++) {
      let tmp = i * springFactor
      let before = Number(Math.floor(tmp)).toFixed()
      let after = Number(Math.ceil(tmp)).toFixed()
      let atPoint = tmp - before
      newData[i] = linearInterpolate(data[before], data[after], atPoint)[0]
    }

    newData[fitCount - 1] = data[data.length - 1] // for new allocation
    return newData
  }

  render() {
    const { graphData } = this.props
    const Weather = this.renderWeather
    const contentInset = { top: 30, bottom: 30 }

    const fuckingData =
      graphData.length > 0
        ? this.interpolateTimeseries(this.getMedians(), 4)
        : []

    return (
      <RegularLayout>
        <MyText align="center">Historical NDVI</MyText>
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={fuckingData}
            yAccessor={({ item }) => item.value}
            contentInset={contentInset}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={10}
          />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <AreaChart
              style={{ flex: 1, marginLeft: 16 }}
              data={fuckingData}
              yAccessor={({ item }) => item.value}
              xAccessor={({ item }) => item.date}
              contentInset={contentInset}
              curve={shape.curveNatural}
              svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
              <Grid />
            </AreaChart>
            <XAxis
              style={{ marginHorizontal: -10 }}
              data={fuckingData}
              xAccessor={({ item }) => moment.unix(item.date).format('DD.')}
              contentInset={{ left: 30, right: 18 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        </View>

        <Separator text="Weather" margin="20 0 20 0" />
        <Weather />
      </RegularLayout>
    )
  }
}
