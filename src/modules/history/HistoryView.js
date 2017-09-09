import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List} from 'react-native-elements'
import HistoryLineItem from '../../components/HistoryLineItem'
import {K} from '../../utils/constants'

class HistoryView extends Component {
  static displayName = 'HistoryView'

  static propTypes = {
    history: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  static navigationOptions =
    ({navigation}) => ({
      tabBarKey: navigation.state,
      tabBarlabel: 'History',
      tabBarIcon: () => (<Icon name='history' size={24} />
     ),
      headerTintStart: 'white',
      headerStyle: {
        backgroundStart: '#39babd'
      }
    })

  constructor(props) {
    super(props)
    this.state = {
      'list': [],
      'size': -1,
    }
  }

  componentDidMount() {
    this.setState({list: this.buildList()})
    this.setState({size: this.state.list.length})
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
    navigate({routeName: 'HistoryDetail', params: {item: history.get(key)}})
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.list}
        </List>
      </ScrollView>
    );
  }
}

export default HistoryView
