import React from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import * as appActions from '../../../redux/actions'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import MyText from '../../atoms/MyText/MyText'
import Card from '../../atoms/Card/Card'
import Separator from '../../atoms/Separator/Separator'
import moment from 'moment'
import MyButton from '../../atoms/MyButton/MyButton'
import STYLES from '../../../constants/STYLES'
import TabBarIcon from '../../TabBarIcon'

@connect(
  state => ({
    weather: state.lands.weather,
    graphData: state.lands.graphData,
    rainGraphData: state.lands.rainGraphData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
export default class Analytics extends React.Component {
  static navigationOptions = () => ({
    title: 'Analytics',
  })

  constructor(props) {
    super(props)

    this.state = {
      active: 'ndvi',
    }
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getGraph()
    actions.getRainGraph()
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

  getRainMedians = () => {
    const { rainGraphData } = this.props

    const result = []
    rainGraphData.map(graph => {
      result.push({ value: graph.moisture, date: graph.dt })
    })
    return result
  }

  renderWeather = () =>
    this.props.weather.map(item => (
      <Card key={item.id} padding="10 0 10 0" key={item.dt}>
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
            <MyText type="H5" margin={'0 0 0 5'}>
              {moment.unix(item.dt).format('Do MMM')}
            </MyText>
          </View>
        </View>
      </Card>
    ))

  renderSoil = () =>
    this.props.rainGraphData.map(item => (
      <Card key={item.id} key={item.dt}>
        <MyText type="H4" align="center" margin="0 0 10 0">
          {moment.unix(item.dt).format('Do MMM')}
        </MyText>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TabBarIcon name="ios-thermometer" />
            <MyText align="center">
              10cm {(item.t10 - 273.15).toFixed(2)}C
            </MyText>
          </View>
          <Separator vertical />

          <View style={{ flex: 1, alignItems: 'center' }}>
            <TabBarIcon name="ios-water" />
            <MyText align="center">Moisture {item.moisture}</MyText>
          </View>
          <Separator vertical />

          <View style={{ flex: 1, alignItems: 'center' }}>
            <TabBarIcon name="ios-thermometer" />
            <MyText align="center">
              Surface {(item.t0 - 273.15).toFixed(2)}C
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
    const { graphData, rainGraphData } = this.props
    const { active } = this.state
    const Weather = this.renderWeather
    const Soil = this.renderSoil
    const contentInset = { top: 30, bottom: 30 }

    const ndviData =
      graphData.length > 0
        ? this.interpolateTimeseries(this.getMedians(), 4)
        : []

    const rainData =
      rainGraphData.length > 0
        ? this.interpolateTimeseries(this.getRainMedians(), 4)
        : []

    return (
      <RegularLayout>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <MyButton
            style={{ flex: 1 }}
            ghost={active !== 'ndvi'}
            onPress={() => {
              this.setState({ active: 'ndvi' })
            }}
          >
            <MyText color={active === 'ndvi' ? STYLES.COLORS.WHITE : ''}>
              NDVI
            </MyText>
          </MyButton>
          <MyButton
            style={{ flex: 1 }}
            ghost={active !== 'rain'}
            onPress={() => {
              this.setState({ active: 'rain' })
            }}
          >
            <MyText color={active === 'rain' ? STYLES.COLORS.WHITE : ''}>
              Moisture
            </MyText>
          </MyButton>
        </View>
        {active === 'ndvi' ? (
          <View>
            <Separator text="Historical NDVI" />
            {/* <MyText align="center">Historical NDVI</MyText> */}
            <View style={{ height: 200, flexDirection: 'row' }}>
              <YAxis
                data={ndviData}
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
                  data={ndviData}
                  yAccessor={({ item }) => item.value}
                  xAccessor={({ item }) => item.date}
                  contentInset={contentInset}
                  curve={shape.curveNatural}
                  svg={{ fill: STYLES.COLORS.MAIN_COLOR }}
                >
                  <Grid />
                </AreaChart>
                <XAxis
                  style={{ marginHorizontal: -10 }}
                  data={ndviData}
                  xAccessor={({ item }) => moment.unix(item.date).format('DD.')}
                  contentInset={{ left: 30, right: 18 }}
                  svg={{ fontSize: 10, fill: 'black' }}
                />
              </View>
            </View>

            <Separator text="Weather" margin="20 0 20 0" />
            <Weather />
          </View>
        ) : (
          <View>
            <Separator text="Historical Moisture" />
            {/* <MyText align="center">Historical Moisture</MyText> */}
            <View style={{ height: 200, flexDirection: 'row' }}>
              <YAxis
                data={rainData}
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
                  data={rainData}
                  yAccessor={({ item }) => item.value}
                  xAccessor={({ item }) => item.date}
                  contentInset={contentInset}
                  curve={shape.curveNatural}
                  svg={{ fill: STYLES.COLORS.MAIN_COLOR }}
                >
                  <Grid />
                </AreaChart>
                <XAxis
                  style={{ marginHorizontal: -10 }}
                  data={rainData}
                  xAccessor={({ item }) => moment.unix(item.date).format('DD.')}
                  contentInset={{ left: 30, right: 18 }}
                  svg={{ fontSize: 10, fill: 'black' }}
                />
              </View>
            </View>
            <Separator text="Soil data" margin="20 0 20 0" />
            <Soil />
          </View>
        )}
      </RegularLayout>
    )
  }
}
