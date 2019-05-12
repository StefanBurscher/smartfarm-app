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
    reportDetails: state.lands.reportDetails,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
export default class ReportDetails extends React.Component {
  static navigationOptions = () => ({
    title: 'Report',
  })

  componentDidMount() {
    const { actions, navigation } = this.props
    const reportID = navigation.getParam('reportID')
    actions.getReportDetails(reportID)
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
    const { reportDetails } = this.props
    const status = this.getStatusByType(reportDetails.status)
    const time = moment(reportDetails.date).isSame(moment(), 'day')
      ? moment(reportDetails.date, 'DD.MM.YYYY').format('HH:mm')
      : moment(reportDetails.date, 'DD.MM.YYYY').format('DD MMM YYYY')
    console.log('reportDetails', reportDetails)
    return (
      <RegularLayout>
        <>
          <Card padding="0 0 0 0">
            <Image
              style={{
                flex: 1,
                height: 220
              }}
              resizeMode="cover"
              source={{ uri: reportDetails.image }}
            />
            <MyText type="H3" align="center" margin={'12 0 20 0'}>
              {reportDetails.parent.name}
            </MyText>
          </Card>
          {reportDetails.status === 'diseased' && (
            <>
              <View style={{ flexDirection: 'row', flex: 1, marginTop: 20 }}>
                <MyText style={{ flex: 1 }}>Disease:</MyText>
                <MyText
                  style={{ flex: 1 }}
                  align="right"
                  color={STYLES.COLORS.ORANGE}
                >
                  {reportDetails.disease}
                </MyText>
              </View>
              <Separator margin="20 0 20 0" />
            </>
          )}
          <View style={{ flexDirection: 'row' }}>
            <MyText style={{ flex: 1 }}>Status:</MyText>
            {status}
          </View>

          <Separator margin="20 0 20 0" />
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <MyText style={{ flex: 1 }}>Date:</MyText>
            <MyText style={{ flex: 1 }} align="right">
              {time}
            </MyText>
          </View>

          {reportDetails.status === 'diseased' && (
            <>
              <Separator text="Recommendations" margin="40 0 10 0" />
              {reportDetails.recommendations.map(recommendation => (
                <Card color={STYLES.COLORS.DARK_GRAY_OPACITY}>
                  <MyText>
                    <TabBarIcon
                      name="ios-warning"
                      color={
                        recommendation.level === 1
                          ? STYLES.COLORS.RED
                          : STYLES.COLORS.ORANGE
                      }
                    />
                    {'  '}
                    {recommendation.message}
                  </MyText>
                </Card>
              ))}
            </>
          )}
        </>
      </RegularLayout>
    )
  }
}
