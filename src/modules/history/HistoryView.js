import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List} from 'react-native-elements'
import HistoryLineItem from '../../components/HistoryLineItem'
import {K} from '../../utils/constants'
import {pure} from 'recompose'
 /*eslint-disable no-unused-vars*/
class HistoryView extends Component {
  static displayName = 'HistoryView'

  static navigationOptions =
    ({navigation}) => ({
      tabBarKey: navigation.state,
      tabBarlabel: 'Home',
      tabBarIcon: (props) => (<Icon name='history' size={24} />
     ),
      headerTintStart: 'white',
      headerStyle: {
        backgroundStart: '#39babd'
      }
    })

  static propTypes = {
    history: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    historyActions: PropTypes.shape({
      deleteSet: PropTypes.func.isRequired,
    })
  }

  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.history.size !== nextProps.history.size
  }

  buildList = () => {
    const {history} = this.props

    let list = []
    history.map((item,i) => {
      console.log('adding ' + i)
      list.push(<HistoryLineItem index={i} key={i} title={item.get(K.HISTORY_LABEL)} cb={this.showHistory}/>)
    })

    return list
  }

  showHistory = (key) => {
    const {navigate, history} = this.props
    navigate({routeName: 'HistoryDetail',
      params: {item: history.get(key), index: key, deleteCb: this.delete}})
  }

  delete = (index) => {
    this.props.historyActions.deleteSet(index)
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.buildList()}
        </List>
      </ScrollView>
    );
  }
}

export default HistoryView
