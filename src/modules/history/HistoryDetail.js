import React from 'react'
import PropTypes from 'prop-types'
import {View, ScrollView, StyleSheet} from 'react-native'
import AppText from '../../components/AppText'
import {Icon} from 'react-native-vector-icons/MaterialIcons'
import HistoryDetailsGrid from '../../components/HistoryDetailsGrid'
import {K} from '../../utils/constants'

class HistoryDetail extends React.Component {

  static navigationOptions =
  ({navigation}) => ({
    tabBarKey: navigation.state,
    tabBarlabel: 'History Details',
    tabBarIcon: (props) => (<Icon name='history' size={24} color={props.tintColor} />
   ),
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#39babd'
    }
  });

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  // so it seems like using the react-navigation parameter to pass in an
  // immutable Map converts it to a POJS object. So use item[key] rather than item.get(key)
  render() {
    const {params} = this.props.navigation.state
    const item = params.item
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top}>
            <AppText size='lg'>{item[K.HISTORY_LABEL]}</AppText>
          </View>
          <View style={styles.top}>
            <AppText size='lg'>board:</AppText>
            <AppText size='sm'>{item[K.BOARD_LABEL]}</AppText>
          </View>
          <View style={styles.top}>
            <AppText size='lg'>program:</AppText>
            <AppText size='sm'>{item[K.PROGRAM_LABEL]}</AppText>
          </View>
          <View style={styles.bottom}>
            <HistoryDetailsGrid history={item} style={styles.grid}/>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flex: 5,
    flexDirection: 'row',
  }
})

export default HistoryDetail
