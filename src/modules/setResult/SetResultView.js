/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   04-08-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 06-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import React, {PropTypes, Component} from 'react';
import {
  Button,
  View,
  StyleSheet
} from 'react-native';
import RepsComplete from '../../components/RepsComplete'
import WeightView from '../../components/WeightView'
import AppText from '../../components/AppText'

/*
** view to collect results from a set:
**    - what was the last successful rep
**    - what weight should we use next time
*/
class SetResultView extends Component {
  static displayName = 'SetResultView';

  static propTypes = {
    exId: PropTypes.string.isRequired,
    setId: PropTypes.string.isRequired,
    setLabel: PropTypes.string.isRequired,
    workoutWeight: PropTypes.number.isRequired,
    sessionWeight: PropTypes.number.isRequired,
    grip: PropTypes.string.isRequired,
    reps: PropTypes.number.isRequired,
    save: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    workoutStateActions: PropTypes.shape({
      adjustWeight: PropTypes.func.isRequired,
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      lastSuccess: -1,
    };
  }

  save = () => {
    const {exId, setId, save} = this.props
    save(exId, setId, this.state.lastSuccess)
  };

  addWeight = () => {
    this.props.workoutStateActions.adjustWeight(true, true, this.props.exId)
  }

  removeWeight = () => {
    this.props.workoutStateActions.adjustWeight(false, true, this.props.exId)
  }

  repsComplete = (i) => {
    this.setState({lastSuccess: i})
  }

  render() {
    const {grip,setLabel,sessionWeight,workoutWeight,reps} = this.props
    // only allow the user to edit weight on the first (baseline) setLabel
    // TODO will probably get complaints about this...
    const canEditWeight = setLabel.startsWith('1') ? true : false
    const buttonAppText = 'Save';
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={[styles.row, styles.rowplus]}>
            <AppText size='lg'>Enter Results for Set</AppText>
          </View>
          <View style={styles.row}>
            <AppText size='sm'>Grip:</AppText>
            <AppText size='sm'>{grip}</AppText>
          </View>
          <View style={styles.row}>
            <AppText size='sm'>Set:</AppText>
            <AppText size='sm'>{setLabel}</AppText>
          </View>
          <View style={styles.row}>
            <AppText size='sm'>Weight:</AppText>
            <AppText size='sm'>{sessionWeight}</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <RepsComplete reps={reps}
                        style={styles.container}
                        cb={this.repsComplete}
                        complete={this.state['lastSuccess']}/>
        </View>
        <View style={styles.row}>
          <WeightView weight={workoutWeight}
                      title='Next Workout Weight'
                      addCb={this.addWeight}
                      removeCb={this.removeWeight}
                      allowUpdate={canEditWeight}/>
        </View>
        <View style={styles.row}>
          <Button color='#ee7f06' title={buttonAppText} onPress={this.save}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // repsComplete: {
  //   flex: 3,
  // },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  rowplus: {
    flex: 1.5,
  },
  header: {
    flex: 1,
    color: '#989898',
    fontSize: 38,
    textAlign: 'right',
    paddingRight: 10
  },
  label: {
    flex: 1,
    color: '#878787',
    fontSize: 32,
    textAlign: 'right',
    paddingRight: 30
  },
  content: {
    flex: 1,
    color: '#878787',
    fontSize: 32,
    textAlign: 'left',
  },
});

export default SetResultView;
