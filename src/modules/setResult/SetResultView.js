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

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet
} from 'react-native';
import RepsComplete from '../../components/RepsComplete'
import WeightView from '../../components/WeightView'
import AppText from '../../components/AppText'
import {K} from '../../utils/constants'

/*
** view to collect results from a set:
**    - what was the last successful rep
**    - what weight should we use next time
*/
class SetResultView extends Component {
  static displayName = 'SetResultView';

  static propTypes = {
    [K.CURRENT_EXERCISE_ID]: PropTypes.string.isRequired,
    [K.SET_ID]: PropTypes.string.isRequired,
    [K.GRIP_LABEL]: PropTypes.string.isRequired,
    [K.SET_LABEL]: PropTypes.string.isRequired,
    sessionWeight: PropTypes.number.isRequired,
    workoutWeight: PropTypes.number.isRequired,
    [K.REPS]: PropTypes.number.isRequired,
    numRepsComplete: PropTypes.number.isRequired,

    // save: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    workoutStateActions: PropTypes.shape({
      adjustWeight: PropTypes.func.isRequired,
      collectedSetResults: PropTypes.func.isRequired,
    })
  };

  addWeight = () => {
    this.props.workoutStateActions.adjustWeight(true, true, this.props.currentExerciseId)
  }

  removeWeight = () => {
    this.props.workoutStateActions.adjustWeight(false, true, this.props.currentExerciseId)
  }

  repsComplete = (i) => {
    const {currentExerciseId, setId, workoutStateActions: {collectedSetResults}} = this.props
    collectedSetResults(currentExerciseId, setId, i)
    // this.setState({lastSuccess: i})
  }

  render() {
    const {gripLabel,setLabel,sessionWeight,workoutWeight,reps, numRepsComplete} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={[styles.row, styles.rowplus]}>
            <AppText size='lg'>Enter Results</AppText>
          </View>
          <View style={styles.row}>
            <AppText size='sm'>Grip:</AppText>
            <AppText size='sm'>{gripLabel}</AppText>
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
                        title='Last Successful Rep'
                        complete={numRepsComplete}/>
        </View>
        <View style={styles.row}>
          <WeightView weight={workoutWeight}
                      title='Baseline Weight'
                      addCb={this.addWeight}
                      removeCb={this.removeWeight}
                      allowUpdate={true}/>
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
