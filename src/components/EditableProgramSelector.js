import React from 'react'
import PropTypes from 'prop-types'
import {View, Picker} from 'react-native'
import AppText from './AppText'
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {K} from '../utils/constants'

class EditableProgramView extends React.Component {

  static propTypes = {
    programs: PropTypes.object.isRequired,
    defaultProgramId: PropTypes.string.isRequired,
    defaultBoardId: PropTypes.string.isRequired,
    selectCb: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {edit: false}
  }

  changeProgram = () => this.setState({edit: true})

  selectProgram = (programId) => {
    this.setState({edit: false})
    this.props.selectCb(programId)
  }

  buildProgramChoices = () => {
    const {programs} = this.props
    let itemArr = []
    // painful realization that stringy number keys are suboptimal
    const sorted = programs.sortBy((v,k) => parseInt(k))
    sorted.mapKeys(programId => {
      itemArr.push(<Picker.Item
        label={programs.get(programId).get(K.TITLE)}
        value={programId}
        key={programId}/>
      )
    })
    return itemArr
  }

  render() {
    const {programs, defaultProgramId} = this.props
    if (!this.state.edit) {
      const name = programs.get(defaultProgramId).get(K.TITLE)
      return (
        <View style={styles.row}>
          <AppText size='sm'>{name}</AppText>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Change program'}
            onPress={this.changeProgram}
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
            selectedValue={defaultProgramId}
            onValueChange={(itemValue) => this.selectProgram(itemValue)}
            >
            {this.buildProgramChoices()}
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

export default EditableProgramView
