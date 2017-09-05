import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List, ListItem} from 'react-native-elements'

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
      'list': []
    }
  }

  componentWillMount() {
    this.setState({'list': this.buildList()})
  }

  buildList = () => {
    const {history} = this.props
    let list = []
    history.mapKeys((key) => {
      console.log('adding ' + key)
      list.push(<ListItem key={key} title={key} onPress={() => this.showHistory(key, history.get(key))}/>)
    })
    return list
  }

  showHistory = (key, workout) => {
    this.props.navigate({routeName: 'HistoryDetail', params: {key: key, [key]: workout}})
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
})

export default HistoryView
