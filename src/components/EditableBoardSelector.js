import React from 'react'
import PropTypes from 'prop-types'
import {View, Picker} from 'react-native'
import AppText from './AppText'
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {K} from '../utils/constants'

class EditableBoardSelector extends React.Component {

  static propTypes = {
    boards: PropTypes.object.isRequired,
    defaultBoardId: PropTypes.string.isRequired,
    selectCb: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {edit: false}
  }

  changeBoard = () => this.setState({edit: true})

  selectBoard = (boardId) => {
    this.setState({edit: false})
    this.props.selectCb(boardId)
  }

  buildBoardChoices = () => {
    const {boards} = this.props
    let itemArr = []
    // painful realization that stringy number keys are suboptimal
    const sorted = boards.get('index').sortBy((v,k) => parseInt(k))
    sorted.mapKeys(boardId => {
      itemArr.push(<Picker.Item
        label={boards.getIn(['index',boardId]).get(K.NAME)}
        value={boardId}
        key={boardId}/>
      )
    })
    return itemArr
  }

  render() {
    const {boards, defaultBoardId} = this.props
    if (!this.state.edit) {
      const name = boards.getIn(['index',defaultBoardId]).get(K.NAME)
      return (
        <View style={styles.row}>
          <AppText size='sm'>{name}</AppText>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Change board'}
            onPress={this.changeBoard}
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
            selectedValue={defaultBoardId}
            onValueChange={(itemValue) => this.selectBoard(itemValue)}
            >
            {this.buildBoardChoices()}
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
    backgroundColor: 'white',
    // fontSize: 32,  // doesn't work on Android...
    width: 100,
  }
})

export default EditableBoardSelector
