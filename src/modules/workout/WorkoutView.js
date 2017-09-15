/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   22-07-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View
} from 'react-native';
import WeightView from '../../components/WeightView'
import NextView from '../../components/NextView'
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimerViewContainer from '../timer/TimerViewContainer';
import {K} from '../../utils/constants'
import EditableGripView from '../../components/EditableGripView'
import AppText from '../../components/AppText'

class WorkoutView extends Component {
  static displayName = 'WorkoutView';

  static navigationOptions =
  ({navigation}) => ({
    tabBarKey: navigation.state,
    tabBarLabel: 'Hang',
    tabBarIcon: () => (
        <Icon name='pages' size={24} color='red' />
      )
  });

  static theme = 'dark'

  static propTypes = {
    session: PropTypes.object.isRequired,
    workouts: PropTypes.object.isRequired,
    boards: PropTypes.object.isRequired,
    workoutStateActions: PropTypes.shape({
      load: PropTypes.func.isRequired,
      complete: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired,
      adjustWeight: PropTypes.func.isRequired,
      collectedSetResults: PropTypes.func.isRequired,
      changeGrip: PropTypes.func.isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  load = (workoutId) => {
    this.props.workoutStateActions.load(workoutId);
  };

  complete = () => {
    this.props.workoutStateActions.complete();
  };

  reset = () => {
    this.props.workoutStateActions.reset();
  };

  addWeight = () => {
    this.props.workoutStateActions.adjustWeight(true, false, this.props.session.get(K.CURRENT_EXERCISE_ID))
  }

  removeWeight = () => {
    this.props.workoutStateActions.adjustWeight(false, false, this.props.session.get(K.CURRENT_EXERCISE_ID))
  }

  changeGrip = (newGrip) => {
    this.props.workoutStateActions.changeGrip(newGrip)
  }

  showBoard = () => {
    const {navigate, workouts, session} = this.props
    navigate({routeName: 'Image',
      params: {boardId: workouts.get(session.get(K.WORKOUT_ID)).get(K.BOARD)}})
  }

  loadDefault = () => {
    this.load(this.props.session.get('lastWorkoutId'))
  }

  render() {
    const {session, workouts, boards} = this.props
    const phase = session.get(K.PHASE)
    if (phase === K.INIT)
      {return (<View><AppText size='lg'>Please pick a workout from the home tab</AppText></View>)}

    return (
      <View style={styles.container}>

        {/* {this.renderUserInfo()} */}
        <View style={styles.phase}>
          <AppText size='xl'>
            {session.get(K.PHASE_LABEL)}
          </AppText>
        </View>
        <TimerViewContainer/>
        <EditableGripView session={session}
            board={boards.get(workouts.get(session.get(K.WORKOUT_ID)).get(K.BOARD))}
            currGripId={workouts.get(session.get(K.WORKOUT_ID))
                                .get(K.GRIPS).get(session.get(K.CURRENT_EXERCISE_ID))}
            selectCb={this.changeGrip}
            showCb={this.showBoard}/>
        <View style={[styles.detailsContainer, styles.altBackground]}>
          <View style={[styles.container, styles.altBackground]}>
            <AppText size='lg' theme='theme'>Grip</AppText>
            <AppText size='xl' theme='theme'>{session.get(K.EXERCISE_LABEL)}</AppText>
          </View>
          <View style={[styles.container, styles.altBackground]}>
            <AppText size='lg' theme='theme'>Set</AppText>
            <AppText size='xl' theme='theme'>{session.get(K.SET_LABEL)}</AppText>
          </View>
          <View style={[styles.container, styles.altBackground]}>
            <AppText size='lg' theme='theme'>Reps</AppText>
            <AppText size='xl' theme='theme'>{session.get(K.REP_LABEL)}</AppText>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <WeightView weight={session.get(K.WEIGHT)}
                      title='Weight'
                      addCb={this.addWeight}
                      removeCb={this.removeWeight}
                      allowUpdate={true}/>
          <NextView nextWeight={session.get(K.NEXT_WEIGHT)}
                    nextGrip={session.get(K.NEXT_GRIP)}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 1,
  },
  phase: {
    flex: .5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  altBackground: {backgroundColor: '#dfdfdf'},
});

export default WorkoutView;
