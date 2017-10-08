import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
} from 'react-native'
import {CheckBox, Card} from 'react-native-elements'
import {PhaseLabels} from '../workout/WorkoutState'
import {K} from '../../utils/constants'
import VersionNumber from 'react-native-version-number'
import AppText from '../../components/AppText'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EditableProgramSelector from '../../components/EditableProgramSelector'
import EditableBoardSelector from '../../components/EditableBoardSelector'

class SettingsView extends Component {
  static displayName = 'SettingsView';

  static navigationOptions =
    ({navigation}) => ({
      tabBarKey: navigation.state,
      tabBarlabel: 'Home',
      tabBarIcon: () => (<Icon name='settings' size={24} />),
      headerTintStart: 'white',
      headerStyle: {
        backgroundStart: '#39babd'
      }
    })

  static propTypes = {
    programs: PropTypes.object.isRequired,
    defaultProgramId: PropTypes.string.isRequired,
    boards: PropTypes.object.isRequired,
    defaultBoardId: PropTypes.string.isRequired,
    ticksFor: PropTypes.object.isRequired,
    beepsFor: PropTypes.object.isRequired,
    dingsFor: PropTypes.object.isRequired,
    settingsStateActions: PropTypes.shape({
      updateTicksFor: PropTypes.func.isRequired,
      updateBeepsFor: PropTypes.func.isRequired,
      updateDingsFor: PropTypes.func.isRequired,
      setDefaultProgram: PropTypes.func.isRequired,
      setDefaultBoard: PropTypes.func.isRequired,
    }),
  };

  buildTicks = () => {
    const {ticksFor} = this.props
    let retval = []
    var onPressCheckBox = this.onPressPartial(K.TICKS)
    ticksFor.mapKeys((phase) => {
      retval.push(
        <CheckBox key={'tick' + phase}
                  checked={ticksFor.get(phase)}
                  title={PhaseLabels[phase]}
                  onPress={() => onPressCheckBox(phase)}/>
      )
    })
    return retval
  }

  buildBeeps = () => {
    const {beepsFor} = this.props
    let retval = []
    var onPressCheckBox = this.onPressPartial(K.BEEPS)
    beepsFor.mapKeys(phase => {
      retval.push(
        <CheckBox key={'beep' + phase}
                  checked={beepsFor.get(phase)}
                  title={PhaseLabels[phase]}
                  onPress={() => onPressCheckBox(phase)}/>
      )
    })
    return retval
  }

  buildDings = () => {
    const {dingsFor} = this.props
    let retval = []
    var onPressCheckBox = this.onPressPartial(K.DINGS)
    dingsFor.mapKeys(phase => {
      retval.push(
        <CheckBox key={'ding' + phase}
                  checked={dingsFor.get(phase)}
                  title={PhaseLabels[phase]}
                  onPress={() => onPressCheckBox(phase)}/>
      )
    })
    return retval
  }

  onPressPartial = (soundType) => (phase) => {
    const {ticksFor, beepsFor, dingsFor,
            settingsStateActions: {updateTicksFor, updateBeepsFor, updateDingsFor}} = this.props
    switch (soundType) {
      case K.TICKS:
        return updateTicksFor(phase, !ticksFor.get(phase))
      case K.BEEPS:
        return updateBeepsFor(phase, !beepsFor.get(phase))
      case K.DINGS:
        return updateDingsFor(phase, !dingsFor.get(phase))
      default:
        return null
    }
  }

  render() {
    const {programs, defaultProgramId, boards, defaultBoardId,
            settingsStateActions: {setDefaultBoard, setDefaultProgram}} = this.props
    const ticks = this.buildTicks()
    const beeps = this.buildBeeps()
    const dings = this.buildDings()
    return (
      <ScrollView>
        <View>
          <AppText size='sm'>{'App version: ' + VersionNumber.appVersion}</AppText>
        </View>
        {/* <AppText size='lg'>Sounds</AppText> */}
        <View>
          <Card title='Workout'>
            <EditableProgramSelector programs={programs}
                                  defaultProgramId={defaultProgramId}
                                  defaultBoardId={defaultBoardId}
                                  selectCb={setDefaultProgram}/>
          </Card>
          <Card title='Board'>
            <EditableBoardSelector
                                  boards={boards}
                                  defaultProgramId={defaultProgramId}
                                  defaultBoardId={defaultBoardId}
                                  selectCb={setDefaultBoard}/>
          </Card>
          <Card title='Audio - Ticks for:'>
            {ticks}
          </Card>
          <Card title='Audio - 3 second beeps for:'>
            {beeps}
          </Card>
          <Card title='Audio - Ding at end of:'>
            {dings}
          </Card>
        </View>
      </ScrollView>
    );
  }
}

export default SettingsView
