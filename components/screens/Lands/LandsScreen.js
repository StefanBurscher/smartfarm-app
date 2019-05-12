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

const data = {
  id: 1,
  image: 'http://www.ekapija.com/thumbs/njiva_traktor_131216_tw630.jpg',
  name: 'Njiva 1',
}

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
export default class LandsScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Lands',
  })

  renderLandsList = () => (
    <Card
      padding="0 0 0 0"
      onClick={() => {
        this.navigateTo('Lands', { id: data.id })
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ flex: 1, overflow: 'hidden' }}
            resizeMode="cover"
            source={{ uri: data.image }}
          />
        </View>
        <View style={{ flex: 1, padding: 12 }}>
          <MyText type="H3" margin={'0 0 0 5'}>
            {data.name}
          </MyText>
          <Separator margin="20 0 20 0" />
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TabBarIcon name='ios-refresh' />
            <MyText type="H5" margin={'0 0 0 5'}>
              Request a report
            </MyText>
          </View>
        </View>
      </View>
    </Card>
  )

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
    const transactionsDisplay = [
      { id: '1', name: 'report 1', status: 'pending', date: '11.5.2019' },
      { id: '2', name: 'report 2', status: 'healthy', date: '8.5.2019' },
      { id: '3', name: 'report 3', status: 'diseased', date: '4.5.2019' },
    ]
    return (
      <RegularLayout>
        <>
          <LandList />
          <Separator margin="20 0 20 0" text="Report history" />
          <FlatList
            data={transactionsDisplay}
            renderItem={({ item }) => {
              const time = moment(item.date).isSame(moment(), 'day')
                ? moment(item.date, 'DD.MM.YYYY').format('HH:mm')
                : moment(item.date, 'DD.MM.YYYY').format('DD MMM YYYY')
              const status = this.getStatusByType(item.status)
              return (
                <TouchableOpacity
                  onPress={() =>
                    actions.navigateTo('ReportDetails', { id: item.id })
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
