import React from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appActions from '../../../redux/actions'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import MyText from '../../atoms/MyText/MyText'
import Card from '../../atoms/Card/Card'
import HomeScreenStyle from './HomeScreen.styles'
import TabBarIcon from '../../TabBarIcon'

@connect(
  state => ({
    allLands: state.lands.allLands,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
export default class HomeScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Lands',
    right: 'logout',
  })

  componentDidMount() {
    const { actions } = this.props
    actions.getAllLands()
  }

  renderAddMore = () => {
    const { actions } = this.props
    const style = HomeScreenStyle

    return (
      <TouchableOpacity
        style={style.addMore}
        onPress={() => {
          actions.navigateTo('AddLands')
        }}
      >
        <TabBarIcon focused name={'ios-add'} />
        <MyText type="H5" margin={'0 0 0 0'}>
          {' '}
          Add lands
        </MyText>
      </TouchableOpacity>
    )
  }

  renderLandsList = () =>
    this.props.allLands.map(land => (
      <Card
        key={land.id}
        padding="0 0 0 0"
        onPress={() => {
          this.props.actions.navigateTo('Lands', { landID: land.id })
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Image
              style={{ flex: 1, height: 100 }}
              resizeMode="cover"
              source={{ uri: land.image }}
            />
          </View>
          <View style={{ flex: 1, padding: 12, justifyContent: 'center' }}>
            <MyText type="H3" margin={'0 0 0 0'}>
              {land.name}
            </MyText>
            <MyText type="H6" margin={'10 0 0 0'}>
              <TabBarIcon name="ios-pin" size={18} />
              {'  '}
              {land.location}
            </MyText>
          </View>
        </View>
      </Card>
    ))

  render() {
    const AddMore = this.renderAddMore
    const LandList = this.renderLandsList

    return (
      <RegularLayout>
        <AddMore />
        <LandList />
      </RegularLayout>
    )
  }
}
