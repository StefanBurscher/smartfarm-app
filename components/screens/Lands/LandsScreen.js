import React from 'react'
import { TouchableOpacity, Image, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import * as appActions from '../../../redux/actions'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import MyText from '../../atoms/MyText/MyText'
import Card from '../../atoms/Card/Card'
import Separator from '../../atoms/Separator/Separator'
import STYLES from '../../../constants/STYLES'
import TabBarIcon from '../../TabBarIcon'

@connect(
  state => ({
    landDetails: state.lands.landDetails,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
export default class LandsScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Lands',
  })

  componentDidMount() {
    const { actions, navigation } = this.props
    const landID = navigation.getParam('landID')
    actions.getLandDetails(landID)
  }

  renderLandsList = () => {
    const { actions } = this.props
    const data = this.props.landDetails
    return (
      <Card
        padding="0 0 0 0"
        onClick={() => {
          this.navigateTo('Lands', { id: data.id })
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{ flex: 1, overflow: 'hidden', height: 150 }}
            resizeMode="cover"
            source={{ uri: data.image }}
          />
        </View>
        <View>
          <View style={{ padding: 12 }}>
            <MyText type="H3" margin={'0 0 0 5'}>
              {data.name}
            </MyText>
            <Separator margin="20 0 20 0" />
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <TabBarIcon name="ios-refresh" />
                <MyText type="H5" margin={'0 0 0 5'}>
                  Report
                </MyText>
              </View>

              <Separator vertical />
              <TouchableOpacity
                onPress={() => {
                  actions.navigateTo('Analytics')
                }}
                style={{ flex: 1, alignItems: 'center' }}
              >
                <TabBarIcon name="ios-analytics" />
                <MyText type="H5" margin={'0 0 0 5'}>
                  Analytics
                </MyText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    )
  }

  getStatusByType = status => {
    switch (status) {
      case 'pending':
        return (
          <MyText align="right" color={STYLES.COLORS.ORANGE}>
            Pending
          </MyText>
        )
      case 'diseased':
        return (
          <MyText align="right" color={STYLES.COLORS.RED}>
            Diseased
          </MyText>
        )
      default:
        return (
          <MyText align="right" color={STYLES.COLORS.MAIN_COLOR}>
            Healthy
          </MyText>
        )
    }
  }

  render() {
    const { actions } = this.props
    const LandList = this.renderLandsList
    return (
      <RegularLayout>
        <>
          <LandList />
          <Separator margin="20 0 20 0" text="Report history" />
          <FlatList
            data={this.props.landDetails.reports}
            renderItem={({ item }) => {
              const time = moment(item.date).isSame(moment(), 'day')
                ? moment(item.date, 'DD.MM.YYYY').format('HH:mm')
                : moment(item.date, 'DD.MM.YYYY').format('DD MMM YYYY')
              const status = this.getStatusByType(item.status)
              return (
                <TouchableOpacity
                  onPress={() =>
                    actions.navigateTo('ReportDetails', { reportID: item.id })
                  }
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <MyText type="H3">{item.name}</MyText>
                    </View>
                    <View style={{ flex: 1 }}>
                      {status}
                      <MyText align="right">{time}</MyText>
                    </View>
                  </View>
                  <Separator margin="20 0 20 0" />
                </TouchableOpacity>
              )
            }}
            keyExtractor={item => item.id}
          />
        </>
      </RegularLayout>
    )
  }
}
