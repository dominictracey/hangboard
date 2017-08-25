import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import {CheckBox, Card} from 'react-native-elements'
import {PhaseLabels} from '../workout/WorkoutState'
import {K} from '../../utils/constants'

class SettingsView extends Component {
  static displayName = 'SettingsView';

  static propTypes = {
    ticksFor: PropTypes.object.isRequired,
    beepsFor: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    settingsStateActions: PropTypes.shape({
      updateTicksFor: PropTypes.func.isRequired,
      updateBeepsFor: PropTypes.func.isRequired,
    })
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

  onPressPartial = (soundType) => (phase) => {
    const {ticksFor, beepsFor, settingsStateActions: {updateTicksFor, updateBeepsFor}} = this.props
    return soundType === K.TICKS
      ? updateTicksFor(phase, !ticksFor.get(phase))
      : updateBeepsFor(phase, !beepsFor.get(phase))
  }

  render() {
    const ticks = this.buildTicks()
    const beeps = this.buildBeeps()
    return (
      <View style={styles.container}>
        {/* <AppText size='lg'>Sounds</AppText> */}
        <View style={styles.row}>
          <Card title='Ticks For:'>
            {ticks}
          </Card>
          <Card title='3 second beeps For:'>
            {beeps}
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  row: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70, //otherwise hides under the tab bar on iOS
  },
});

export default SettingsView;
