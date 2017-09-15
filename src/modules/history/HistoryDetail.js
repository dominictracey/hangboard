import React from 'react'
import PropTypes from 'prop-types'
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import AppText from '../../components/AppText'
import {Card} from 'react-native-elements'
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

  delete = () => {
    const {deleteCb, index} = this.props.navigation.state.params
    deleteCb(index)
  }

  // so it seems like using the react-navigation parameter to pass in an
  // immutable Map converts it to a POJS object. So use item[key] rather than item.get(key)
  render() {
    const {params} = this.props.navigation.state
    const item = params.item
    const deleteButton = params.index !== 0
      ? (
        // <View style={styles.top}>
        <TouchableOpacity
          style={styles.deleteButton}
          accessible={true}
          accessibilityLabel={'Delete Workout'}
          onPress={this.delete}>
          <AppText size='lg' theme='dark' flex='0'>
            Delete Workout
          </AppText>
        </TouchableOpacity>
      )
      // </View>)
      : null
    return (
      <ScrollView>
        <Card title={item[K.HISTORY_LABEL]}>
        {/* <View style={styles.top}>
          <AppText size='lg'>{item[K.HISTORY_LABEL]}</AppText>
        </View> */}
        <View style={styles.top}>
          <AppText size='lg'>Board:</AppText>
          <AppText size='sm'>{item[K.BOARD_LABEL]}</AppText>
        </View>
        <View style={styles.top}>
          <AppText size='lg'>Program:</AppText>
          <AppText size='sm'>{item[K.PROGRAM_LABEL]}</AppText>
        </View>
        </Card>

        <Card title='Completed Sets'>
          <HistoryDetailsGrid history={item} style={styles.grid}/>
        </Card>
        <Card>
          {deleteButton}
        </Card>
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
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 5,
    shadowOpacity: 50,
    elevation: .5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    shadowColor: '#888888',
    margin: 20
  }
})

export default HistoryDetail
