/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   03-08-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import React, {PropTypes} from 'react'
import {View, Picker} from 'react-native'
import AppText from './AppText'
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {K} from '../utils/constants'

class EditableGripView extends React.Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired,
    selectCb: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {edit: false}
  }

  changeGrip = () => {
    this.setState({edit: true})
  }

  selectGrip = (gripId) => {
    this.setState({edit: false})
    this.props.selectCb(gripId)
  }

  buildGripChoices = (board) => {
    let itemArr = []
    // painful realization that stringy number keys are suboptimal
    const sorted = board.get('grips').sortBy((v,k) => parseInt(k))
    sorted.mapKeys(gripId => {
      itemArr.push(<Picker.Item
        label={board.getIn(['grips',gripId]).get('name')}
        value={gripId}
        key={gripId}/>
      )
    })
    return itemArr
  }

  render() {
    const {session, board} = this.props
    if (!this.state.edit) {
      return (
        <View style={styles.row}>
          <AppText size='sm'>{session.get(K.GRIP)}</AppText>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Change grip'}
            onPress={this.changeGrip}
            style={[styles.editButton]}>
            <Icon name='mode-edit' size={24} color='black'/>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.row}>
          <Picker
            style={styles.picker}
            selectedValue={session.getIn(['grips',session.get(K.CURRENT_EXERCISE_ID)])}
            onValueChange={(itemValue, itemIndex) => this.selectGrip(itemValue, itemIndex)}
            >
            {this.buildGripChoices(board)}
          </Picker>
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  row: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    color: '#878787',
    fontSize: 32,
  },
  editButton: {
    padding: 10,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    // fontSize: 32,  // doesn't work on Android...
    width: 100,
  }
})

export default EditableGripView
