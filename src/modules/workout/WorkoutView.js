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

  componentDidMount() {
    //this.load();
  }

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
    this.props.workoutStateActions.adjustWeight(true, false, this.props.session.get('currentExerciseId'))
  }

  removeWeight = () => {
    this.props.workoutStateActions.adjustWeight(false, false, this.props.session.get('currentExerciseId'))
  }

  changeGrip = (newGrip) => {
    this.props.workoutStateActions.changeGrip(newGrip)
  }

  showBoard = () => {
    this.props.navigate({routeName: 'Image'})
  }

  loadDefault = () => {
    this.load(this.props.session.get('lastWorkoutId'))
  }

  // loadPage = () => {
  //   // this should be the startview now so we can remove this I think?
  //   const {workouts,session} = this.props;
  //   const loadingStyle = session.get('loading')
  //         ? {backgroundColor: '#eee'}
  //         : null;
  //   return (
  //       <View style={styles.container}>
  //       <TouchableOpacity
  //         style={[styles.defaultStartButton, loadingStyle]}
  //           accessible={true}
  //           accessibilityLabel={'Start Workout'}
  //           onPress={this.loadDefault}>
  //         <AppText size='lg' theme={this.theme}>
  //           Start Workout
  //         </AppText>
  //       </TouchableOpacity>
  //       <AppText size='lg' theme='theme'>{workouts.getIn([session.get('lastWorkoutId'),'name'])}</AppText>
  //     </View>
  //   )
  // }
  //
  // workoutPage = () => {
  //   const {session, workouts, boards} = this.props
  //   //const canEditWeight = session.get(K.SET_LABEL).startsWith('1') ? true : false
  //
  //   // console.log('workoutId: ' + session.get(K.WORKOUT_ID))
  //   return (
  //     <View style={styles.container}>
  //
  //       {/* {this.renderUserInfo()} */}
  //       <AppText size='xl'>
  //         {session.get(K.PHASE_LABEL)}
  //       </AppText>
  //       <TimerViewContainer/>
  //       <EditableGripView session={session}
  //           board={boards.get(workouts.get(session.get(K.WORKOUT_ID)).get('board'))}
  //           selectCb={this.changeGrip}
  //           showCb={this.showBoard}/>
  //       <View style={styles.detailsContainer}>
  //         <View style={styles.container}>
  //           <AppText size='lg' theme='theme'>Grip</AppText>
  //           <AppText size='lg' theme='theme'>{session.get(K.EXERCISE_LABEL)}</AppText>
  //         </View>
  //         <View style={styles.container}>
  //           <AppText size='lg' theme='theme'>Set</AppText>
  //           <AppText size='lg' theme='theme'> {session.get('setLabel')}</AppText>
  //         </View>
  //         <View style={styles.container}>
  //           <AppText size='lg' theme='theme'>Rep</AppText>
  //           <AppText size='lg' theme='theme'>{session.get('repLabel')}</AppText>
  //         </View>
  //       </View>
  //       <View style={styles.detailsContainer}>
  //         <WeightView weight={session.get(K.WEIGHT)}
  //                     title='Weight'
  //                     addCb={this.addWeight}
  //                     removeCb={this.removeWeight}
  //                     allowUpdate={true}/>
  //         <NextView nextWeight={session.get('nextWeight')}
  //                   nextGrip={session.get('nextGrip')}/>
  //       </View>
  //     </View>
  //   );
  // }
  //
  // resultPage = () => {
  //   const {session, workoutStateActions} = this.props;
  //   const collectSetResults = session.get('collectSetResults')
  //
  //   return (
  //       <View style={styles.container}>
  //         <SetResultViewContainer exId={collectSetResults.get('exId')}
  //                                 setId={collectSetResults.get('setId')}
  //                                 setLabel={collectSetResults.get('setLabel')}
  //                                 grip={collectSetResults.get(K.GRIP)}
  //                                 reps={collectSetResults.get('reps')}
  //                                 workoutWeight={collectSetResults.get('workoutWeight')}
  //                                 sessionWeight={collectSetResults.get('sessionWeight')}
  //                                 save={workoutStateActions.collectedSetResults}/>
  //     </View>
  //   )
  // }

  render() {
    // const {session} = this.props
    // const phase = session.get(K.PHASE)
    // const needSetResults = session.get(K.COLLECT_SET_RESULTS) && session.get(K.COLLECT_SET_RESULTS).size
    //
    // var view = (<View/>)
    // if (phase === K.INIT) {
    //   view = this.loadPage()
    // } else if (needSetResults) {
    //   view = this.resultPage()
    // } else {
    //   view = this.workoutPage()
    // }
    //
    // return view
    const {session, workouts, boards} = this.props
    const phase = session.get(K.PHASE)
    if (phase === K.INIT)
      {return (<View><AppText size='lg'>Please pick a workout from the home tab</AppText></View>)}

    return (
      <View style={styles.container}>

        {/* {this.renderUserInfo()} */}
        <AppText size='xl'>
          {session.get(K.PHASE_LABEL)}
        </AppText>
        <TimerViewContainer/>
        <EditableGripView session={session}
            board={boards.get(workouts.get(session.get(K.WORKOUT_ID)).get('board'))}
            selectCb={this.changeGrip}
            showCb={this.showBoard}/>
        <View style={styles.detailsContainer}>
          <View style={styles.container}>
            <AppText size='lg' theme='theme'>Grip</AppText>
            <AppText size='lg' theme='theme'>{session.get(K.EXERCISE_LABEL)}</AppText>
          </View>
          <View style={styles.container}>
            <AppText size='lg' theme='theme'>Set</AppText>
            <AppText size='lg' theme='theme'>{session.get('setLabel')}</AppText>
          </View>
          <View style={styles.container}>
            <AppText size='lg' theme='theme'>Reps</AppText>
            <AppText size='lg' theme='theme'>{session.get('repLabel')}</AppText>
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

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const bigCircle = {
  borderWidth: 0,
  borderRadius: 100,
  width: 200,
  height: 200
};

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
    borderWidth: 1
  },
  // timerContainer: {
  //   flex: 1,
  //   // flexDirection: 'row',
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  //   borderWidth: 2,
  //   borderColor: 'green',
  // },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  defaultStartButton: {
    ...bigCircle,
    backgroundColor: '#349d4a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 5,
    shadowColor: '#888888',
    margin: 20
  },
  startWorkout: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
  },
  workout: {
    color: '#dfdfdf',
    fontSize: 50,
    textAlign: 'center'
  },
  phase: {
    color: '#ababab',
    fontSize: 40,
    textAlign: 'center'
  },
  grip: {
    color: '#ababab',
    fontSize: 40,
    textAlign: 'center'
  },
  details: {
    color: '#878787',
    fontSize: 32,
    textAlign: 'center'
  },
  details2: {
    color: '#878787',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default WorkoutView;
