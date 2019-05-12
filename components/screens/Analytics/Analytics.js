import React from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appActions from '../../../redux/actions'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import MyText from '../../atoms/MyText/MyText'
import Card from '../../atoms/Card/Card'
import AnalyticsStyle from './Analytics.styles'
import TabBarIcon from '../../TabBarIcon'
import Separator from '../../atoms/Separator/Separator'

@connect(
  state => ({
    weather: state.lands.weather,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
export default class Analytics extends React.Component {
  static navigationOptions = () => ({
    title: 'Analytics',
  })

  componentDidMount() {
    const { actions } = this.props
    actions.getWeather()
  }

  renderWeather = () =>
    this.props.weather.map(item => (
      <Card key={item.id} padding="0 0 0 0">
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

  render() {
    const Weather = this.renderWeather

    return (
      <RegularLayout>
        <Separator text="Weather" />
        <Weather />
      </RegularLayout>
    )
  }
}
