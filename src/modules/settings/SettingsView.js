import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import {CheckBox, Card} from 'react-native-elements'
import {PhaseLabels} from '../workout/WorkoutState'
import {K} from '../../utils/constants'
import VersionNumber from 'react-native-version-number'
import AppText from '../../components/AppText'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {onlyUpdateForKeys} from 'recompose'
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
    //navigate: PropTypes.func.isRequired,
    settingsStateActions: PropTypes.shape({
      updateTicksFor: PropTypes.func.isRequired,
      updateBeepsFor: PropTypes.func.isRequired,
      setDefaultProgram: PropTypes.func.isRequired,
      setDefaultBoard: PropTypes.func.isRequired,
    }),
  };
  //
  // shouldComponentUpdate(nextProps, nextState) {

  //   return false
  // }

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

  onPressPartial = (soundType) => (phase) => {
    const {ticksFor, beepsFor, settingsStateActions: {updateTicksFor, updateBeepsFor}} = this.props
    return soundType === K.TICKS
      ? updateTicksFor(phase, !ticksFor.get(phase))
      : updateBeepsFor(phase, !beepsFor.get(phase))
  }

  // setDefaultProgram = (programId, boardId) => this.props.setDefaultProgram(programId, boardId)
  // selectBoard = (programId, boardId) => this.props.setDefaultBoard(programId, boardId)

  render() {
    const {programs, defaultProgramId, boards, defaultBoardId,
            settingsStateActions: {setDefaultBoard, setDefaultProgram}} = this.props
    const ticks = this.buildTicks()
    const beeps = this.buildBeeps()
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <AppText size='sm'>{'App version: ' + VersionNumber.appVersion}</AppText>
        </View>
        {/* <AppText size='lg'>Sounds</AppText> */}
        <View style={styles.row}>
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
          <Card title='Audio - Ticks For:'>
            {ticks}
          </Card>
          <Card title='Audio - 3 second beeps For:'>
            {beeps}
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // backgroundColor: 'white'
  },
  row: {
    // flex: .5,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: 70, //otherwise hides under the tab bar on iOS
  },
});

// can't use HOCs with react-navigation tab items as the icon doesn't show up on ios
//   export default onlyUpdateForKeys(['ticksFor','beepsFor','defaultProgramId','defaultBoardId'])(SettingsView)

export default SettingsView
