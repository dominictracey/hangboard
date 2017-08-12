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

/*eslint-disable no-unused-vars*/

import {fromJS, Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {DONE, setTime, pause} from '../timer/TimerState';
import {NavigationActions} from 'react-navigation'
import {K,M,H} from '../../utils/constants'
import moment from 'moment'

// Initial state
// All keys are strings per https://github.com/facebook/immutable-js/issues/282
const initialState = fromJS({
  boards: {
    '1': {
      name: 'Trango Rock Prodigy Training Center',
      description: 'Blue split board aligned with Mark Anderson\'s seminal book \"Training for Rock Climbing\"',
      grips: {
        '1': {
          name: 'Jug',
          type: H.JUG,
        },
        '2': {
          name: 'Big edge (inner)',
          type: H.EDGE,
        },
        '3': {
          name: 'Little edge (inner)',
          type: H.EDGE,
        },
        '4': {
          name: 'Big edge (outer)',
          type: H.EDGE,
        },
        '5': {
          name: 'Little edge (outer)',
          type: H.EDGE,
        },
        '6': {
          name: 'Sloper',
          type: H.SLOPER,
        },
        '7': {
          name: 'Large 3F pocket',
          type: H.FP3,
        },
        '8': {
          name: 'Wide pinch',
          type: H.PINCH,
        },
        '9': {
          name: 'Narrow pinch',
          type: H.PINCH,
        },
        '10': {
          name: 'Medium pinch',
          type: H.PINCH,
        },
        '11': {
          name: 'Crimp',
          type: H.EDGE,
        },
        '12': {
          name: 'Medium 2F pocket',
          type: H.FP2,
        },
        '13': {
          name: 'Small 2F pocket',
          type: H.FP2,
        },
        '14': {
          name: 'Offset 3F pocket',
          type: H.FP3,
        },
        '15': {
          name: 'Offset 3F pocket (as 2F - outer)',
          type: H.FP2,
        },
        '16': {
          name: 'Offset 3F pocket (as 2F - inner)',
          type: H.FP2,
        },
        '17': {
          name: 'Offset 2F pocket',
          type: H.FP2,
        },
        '18': {
          name: 'Offset 3F pocket (as mono - outer)',
          type: H.FP1,
        },
        '19': {
          name: 'Offset 3F pocket (as mono - middle)',
          type: H.FP1,
        },
        '20': {
          name: 'Offset 3F pocket (as mono - inner)',
          type: H.FP1,
        },
        '21': {
          name: 'Offset 2F pocket (as mono - outer)',
          type: H.FP1,
        },
        '22': {
          name: 'Offset 2F pocket (as mono - inner)',
          type: H.FP1,
        },
      },
    },
  },
  sets: {
    '1': {
      description: '10 on/5 off x 6',
      source: 'Rock Prodigy - beginner',
      reps: 6,
      secs_on: 10,
      secs_off: 5,
      secs_recovery: 180,
      baseline_plus: 0
    },
    '2': {
      description: '7 on/3 off x 7',
      source: 'Rock Prodigy - intermediate 1',
      reps: 7,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 0
    },
    '3': {
      description: '7 on/3 off x 6 - baseline+10',
      source: 'Rock Prodigy - intermediate 2',
      reps: 6,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 10
    },
    '4': {
      description: '7 on/3 off x 5 - baseline+20',
      source: 'Rock Prodigy - advanced 3',
      reps: 5,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 20
    },
    '5': {
      description: 'test',
      source: 'test',
      reps: 3,
      secs_on: 1,
      secs_off: 1,
      secs_recovery: 5,
      baseline_plus: 0
    },
  },
  programs: {
    '1': {
      title: 'Rock Prodigy Beginner Program',
      author: 'Manderson',
      level: 'beginner',
      warmup_secs: 1200,
      exercises: {
        '1': {
          sets: {
            '1': '1'
          }
        },
        '2': {
          sets: {
            '1': '1'
          }
        },
        '3': {
          sets: {
            '1': '1'
          }
        },
        '4': {
          sets: {
            '1': '1'
          }
        },
        '5': {
          sets: {
            '1': '1'
          }
        },
        '6': {
          sets: {
            '1': '1'
          },
        },
      },
    },
    '2': {
      title: 'TEST PROGRAM',
      author: 'DPT',
      level: 'advanced',
      warmup_secs: 3,
      exercises: {
        '1': {
          sets: {
            '1': '5',
          }
        },
        '2': {
          sets: {
            '1': '5',
            '2': '4',
          }
        },
        '3': {
          sets: {
            '1': '5',
          }
        },
      },
    },
    '3': {
      title: 'Rock Prodigy Intermediate Program',
      author: 'Manderson',
      level: 'intermediate',
      warmup_secs: 1200,
      exercises: {
        '1': {
          sets: {
            '1': '2',
          },
        },
        '2': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '3': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '4': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '5': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '6': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '7': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '8': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
      },
    },
    '4': {
      title: 'Rock Prodigy Advanced Program',
      author: 'Manderson',
      level: 'advanced',
      warmup_secs: 1200,
      exercises: {
        '1': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '2': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
        '3': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
        '4': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
        '5': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
        '6': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
        '7': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
      },
    },
  },
  // everything below here should be user configurable
  workouts: {
    '1': {
      name: 'Rock Prodigy Beginner Workout',
      program: '1',
      board: '1',
      weights: {
        '1': 0,
        '2': 0,
        '3': -10,
        '4': -10,
        '5': -20,
        '6': -40,
      },
      grips: {
        '1': '1',
        '2': '3',
        '3': '4',
        '4': '5',
        '5': '6',
        '6': '7',
      }
    },
    '2': {
      name: 'Rock Prodigy Intermediate Workout',
      program: '3',
      board: '1',
      weights: {
        '1': 0,
        '2': 0,
        '3': -10,
        '4': -10,
        '5': -20,
        '6': -40,
      },
      grips: {
        '1': '1',
        '2': '3',
        '3': '4',
        '4': '5',
        '5': '6',
        '6': '7',
      }
    },
    '3': {
      name: 'Rock Prodigy Advanced Workout',
      program: '4',
      board: '1',
      weights: {
        '1': 0,
        '2': 0,
        '3': -10,
        '4': -10,
        '5': -20,
        '6': -40,
      },
      grips: {
        '1': '1',
        '2': '3',
        '3': '4',
        '4': '5',
        '5': '6',
        '6': '7',
      }
    },
    '4': {
      name: 'Test hangboard routine',
      program: '2',
      board: '1',
      weights: {
        '1': 0,
        '2': 10,
        '3': -10,
      },
      grips: {
        '1': '7',
        '2': '2',
        '3': '3',
      },
    },
  },

  session: {
    [K.WORKOUT_ID]: '-',
    [K.LAST_WORKOUT_ID]: '1',

    [K.PHASE]: 'Init',
    [K.CURRENT_EXERCISE_ORD]: '-',
    [K.CURRENT_EXERCISE_ID]: '-',
    [K.CURRENT_SET_ORD]: '-',
    [K.CURRENT_SET_ID]: '-',
    [K.CURRENT_REP]: '-',

    [K.EXERCISE_LABEL]: '-/-',
    [K.SET_LABEL]: '-/-',
    [K.REP_LABEL]: '-/-',
    [K.GRIP]: '--',
    [K.CURRENT_WEIGHT]: '-',
    [K.NEXT_GRIP]: '---',
    [K.NEXT_WEIGHT]: '-',
    [K.COLOR]: '',

    [K.WEIGHTS]: {
    },
    [K.GRIPS]: {
    },

    [K.COLLECT_SET_RESULTS]: {},
    [K.LAST_SUCCESSES]: {},
    [K.COMPLETE]: false,

  },

  [K.HISTORY]: {
  },
  [K.THEME]: 'light',
  loading: false,
});

// Actions
const LOAD = 'WorkoutState/LOAD';  // select workout
const WARMUP = 'WorkoutState/WARMUP'; // begin phases of workout
const EXERCISE = 'WorkoutState/EXERCISE';
const REST = 'WorkoutState/REST';
const RECOVER = 'WorkoutState/RECOVER';
const COMPLETE = 'WorkoutState/COMPLETE'; // the workout is done
const RESET = 'TimerState/RESET'; // re-establish the initialState
const COLLECTRESULTS = 'WorkoutState/COLLECTRESULTS' // the view has popped it up
const COLLECTEDRESULTS = 'WorkoutState/COLLECTEDRESULTS' // the user has entered them
const ADJUSTWEIGHT = 'WorkoutState/ADJUSTWEIGHT' // change a weight value (see params)
const CHANGEGRIP = 'WorkoutState/CHANGEGRIP' // change the current grip

const PhaseLabels = {
  [LOAD]: 'Load',
  [WARMUP]: 'Warmup',
  [EXERCISE]: 'Exercise',
  [REST]: 'Rest',
  [RECOVER]: 'Recovery',
  [COMPLETE]: 'Complete',
};

// how much to add/remove when the climber clicks the plus/minus buttons
const weightAdjustmentAmount = 2.5

// Action creators
export function load(workoutId) {
  return {type: LOAD, workout: workoutId};
}

export function warmup() {
  return {type: WARMUP};
}

export function exercise() {
  return {type: EXERCISE};
}

export function rest() {
  return {type: REST};
}

export function recover() {
  return {type: RECOVER};
}

export function complete() {
  return {type: COMPLETE};
}

export function reset() {
  return {type: RESET};
}

export function collectSetResults(setId, setLabel, exId, grip, reps, sessionWeight, workoutWeight) {
  return {type: COLLECTRESULTS, setId, setLabel, exId, grip, reps, sessionWeight, workoutWeight}
}

export function collectedSetResults(exId, setId, successfulReps) {
  return {type: COLLECTEDRESULTS, exId, setId, successfulReps}
}

export function adjustWeight(add, result, exerciseId) {
  return {type: ADJUSTWEIGHT, add, result, exerciseId}
}

export function changeGrip(newGrip) {
  return {type: CHANGEGRIP, newGrip}
}

// accessors
export const getCurrPhase = (state) => state.getIn(M.PHASE)
export const getWorkoutId = (state) => state.getIn(M.WORKOUT_ID)
  ? state.getIn(M.WORKOUT_ID).toString()
  : '1'

export const getWorkout = (state) => state.getIn(['workouts',getWorkoutId(state)]);
export const getProgramId = (state) => state.getIn(['workouts',getWorkoutId(state),'program']).toString();
export const getProgram = (state) => state.getIn(['programs',getWorkout(state).get('program')]);

export const getCurrExerciseOrd = (state) => state.getIn(M.CURRENT_EXERCISE_ORD);
export const getCurrExerciseId = (state) => state.getIn(M.CURRENT_EXERCISE_ID).toString();
export const getNumExercises = (state) => getProgram(state).get(K.EXERCISES).count()
export const getCurrExercise = (state) => getProgram(state).get(K.EXERCISES).get(getCurrExerciseId(state))

export const getCurrRep = (state) => state.getIn(M.CURRENT_REP);
export const getNumReps = (state) => getCurrSet(state)
  ? getCurrSet(state).get('reps')
  : state.getIn(['sets',getProgram(state).get(K.EXERCISES).get('1').get('sets').get('1'),'reps']);

// this is the number set we are on (e.g. 1 of 2)
export const getCurrSetOrd = (state) => state.getIn(M.CURRENT_SET_ORD);
// this is the id of that set
export const getCurrSetId = (state) =>
  state.getIn(['programs',getProgramId(state),
    'exercises',getCurrExerciseId(state),'sets',getCurrSetOrd(state)]);
// this is the actual immuatable Map
export const getCurrSet = (state) => state.getIn(['sets',getCurrSetId(state)]);
export const getSetLabel = (state) => getCurrSetOrd(state) + '/' + numSetsInExercise(state);
export const getBoardId = (state) => getWorkout(state).get('board');
export const getBoard = (state) => state.getIn(['boards',getBoardId(state)]);
export const getCurrGripName = (state) =>
  getBoard(state).getIn(['grips',state.getIn([...M.GRIPS,getCurrExerciseId(state)]),'name']);
export const getNextGripName = (state) =>
  getBoard(state).getIn(['grips',state.getIn([...M.GRIPS, getCurrExerciseId(state) + 1]),'name']);
export const numSetsInExercise = (state) =>
  state.getIn(['programs', getProgramId(state),'exercises',getCurrExerciseId(state),'sets']).count()
export const getCurrWeight = (state) => state.getIn(M.CURRENT_WEIGHT)
export const getWorkoutWeight = (state) => {
  const setOrd = getCurrSetOrd(state)
  const weightAdjustment = setOrd > 1 ? 10 * (setOrd - 1) : 0 // only autoincrease weights on 2nd+ sets
  return state.getIn(['workouts',getWorkoutId(state),'weights',getCurrExerciseId(state)]) +
    weightAdjustment
}
export const getSessLastSuccesses = (state) => state.getIn(M.LAST_SUCCESSES)

// mutators
export const changePhase = (state, phase) => {
  var color = ''
  if (phase === EXERCISE) {color = 'green'}
  else if (phase === REST) {color = 'orange'}
  else if (phase === RECOVER) {color = 'red'}
  else if (phase === WARMUP) {color = 'blue'}
  else if (phase === COMPLETE) {color = 'purple'}

  return state.updateIn(M.PHASE, phaseSelec => PhaseLabels[phase])
              .updateIn(M.COLOR, c => color)
}

export const setWorkout = (state, workoutId) => {
  if (state.get(K.WORKOUTS).has(workoutId)) {
    const workout = state.getIn(['workouts',workoutId])
    return state.updateIn(M.WORKOUT_ID,id => workoutId)
                .updateIn(M.LAST_WORKOUT_ID,lwid => workoutId)
                .updateIn(M.WEIGHTS, weights => Map(workout.get('weights')))
                .updateIn(M.GRIPS, grips => workout.get('grips'))
                .updateIn(M.LAST_SUCCESSES, ls => Map({}))
  } else {
    // bad workout id
    console.log('attempt to load bad workout id ' + workoutId)
    return null
  }
}

export const incrementRep = (state) => {
  var newRep = getCurrPhase(state) === PhaseLabels[WARMUP] ? 1 : parseInt(getCurrRep(state)) + 1
  return state.updateIn(M.REP_LABEL, rep => newRep + '/' + getNumReps(state))
              .updateIn(M.CURRENT_REP, rep => newRep)
}

export const resetRep = (state) => {
  return state.updateIn(M.REP_LABEL, rep => '0/' + getNumReps(state))
              .updateIn(M.CURRENT_REP, rep => 0)
}

// current assumption is that exercise id == ord.toString()
export const incrementExercise = (state) => {
  var newEx = getCurrExerciseOrd(state) + 1  //note we shouldn't recover after last set
  var newExId = newEx.toString()
  var nextEx = newEx + 1
  var nextGrip = newEx === getNumExercises(state)
    ? 'Complete'
    : getBoard(state).getIn(['grips',state.getIn(['session','grips',nextEx.toString()]),'name'])
  var nextWeight = newEx === getNumExercises(state)
    ? null
    : state.getIn(['session','weights',nextEx.toString()])
  return state.updateIn(M.CURRENT_EXERCISE_ORD, exer => newEx)
              .updateIn(M.CURRENT_EXERCISE_ID, exer => newExId)
              .updateIn(M.CURRENT_EXERCISE, ex =>
                getProgram(state).get(K.EXERCISES).get(newExId))
              .updateIn(M.EXERCISE_LABEL, label => newEx + '/' + getNumExercises(state))
              .updateIn(M.CURRENT_WEIGHT, w => state.getIn([...M.WEIGHTS,newExId]))
              .updateIn(M.GRIP, grip =>
                getBoard(state).getIn(['grips',state.getIn(['session','grips',newExId]),'name']))
              .updateIn(M.NEXT_GRIP, grip => nextGrip)
              .updateIn(M.NEXT_WEIGHT,weight => nextWeight)
}

export const resetExercise = (state, program, workout) => {
  return state.updateIn(M.CURRENT_EXERCISE_ORD, ex => 1)
              .updateIn(M.CURRENT_EXERCISE_ID, ex => '1')
              .updateIn(M.CURRENT_EXERCISE, ex => program.get(K.EXERCISES).get('1'))
              .updateIn(M.EXERCISE_LABEL, label => '1/' + program.get(K.EXERCISES).count())
              .updateIn(M.CURRENT_WEIGHT, w => state.getIn([...M.WEIGHTS,'1']))
              .updateIn(M.NEXT_WEIGHT, w => workout.get('weights').get('2'))
              .updateIn(M.GRIP, grip =>
                getBoard(state).getIn(['grips', state.getIn(['session','grips','1']),'name']))
              .updateIn(M.NEXT_GRIP, grip =>
                getBoard(state).getIn(['grips', state.getIn(['session','grips','2']),'name']))
}

export const incrementSet = (state) => {
  const newSetOrd = parseInt(state.getIn(M.CURRENT_SET_ORD)) + 1
  const newSetId = getProgram(state).getIn([K.EXERCISES,getCurrExerciseId(state),K.SETS,newSetOrd.toString()])
  return state.updateIn(M.CURRENT_SET_ORD, cset => newSetOrd.toString())
              .updateIn(M.CURRENT_SET_ID, id => newSetId)
              .updateIn(M.CURRENT_WEIGHT, w => state.getIn([...M.WEIGHTS,getCurrExerciseId(state)]) +
                      state.getIn([K.SETS,newSetId,'baseline_plus']))
              .updateIn(M.SET_LABEL,
                label => newSetOrd + '/' + numSetsInExercise(state))
}

// for the current exercise, use the first set
export const resetSet = (state, program) => {
  var sets = getCurrExercise(state).get('sets')
  return state.updateIn(M.CURRENT_SET_ORD, set => '1')
                .updateIn(M.CURRENT_SET_ID, set => sets.get('1'))
                .updateIn(M.SET_LABEL, label =>
                  '1/' + sets.count())
}

export const transition = (state) => {
  // we only want to figure out the next phase to go to here, and get going that way
  if (state.getIn(M.PHASE) === PhaseLabels[WARMUP]) {
    // move on to exercise
    return loop(state,Effects.constant(exercise()));
  } else if (state.getIn(M.PHASE) === PhaseLabels[EXERCISE]) {
    // move on to rest or recovery or complete
    if (getCurrSet(state).get('reps') === getCurrRep(state)) {
      if (getProgram(state).get(K.EXERCISES).count() === getCurrExerciseOrd(state)) {
        return loop(state,Effects.constant(complete()));
      } else {
        return loop(state,Effects.constant(recover()));
      }
    } else {
      return loop(state,Effects.constant(rest()));
    }
  } else if (state.getIn(M.PHASE) === PhaseLabels[REST]) {
    return loop(state,Effects.constant(exercise()));
  } else {  // recovery presumably
    return loop(state,Effects.constant(exercise()));
  }
}

// Reducer
export default function WorkoutStateReducer(state = initialState, action = {}) {

  switch (action.type) {
    case LOAD:
      var stateWorkout = setWorkout(state,action.workout)
      if (stateWorkout) { // returns null if bad workoutId requested
        var workout = stateWorkout.getIn(['workouts',action.workout])
        var program = stateWorkout.getIn(['programs',workout.get('program')])
        var state2 = resetRep(stateWorkout)
        var state3 = resetExercise(state2, program, workout)
        var state4 = resetSet(state3)
        return loop(
          changePhase(state4,LOAD)
            .update('loading',loading => true),
          Effects.constant(warmup())
        );
      } else {
        // bad workoutId passed in
        return state
      }

    case WARMUP:
      return loop(
        changePhase(state,WARMUP)
          .update('loading',loading => false),
        Effects.constant(setTime(getProgram(state).get('warmup_secs')))
      );

    case EXERCISE:
      var stateEx = incrementRep(state)
      return loop(
        changePhase(stateEx,EXERCISE),
        Effects.constant(setTime(getCurrSet(stateEx).get('secs_on')))
      );

    case REST:
      return loop(
        changePhase(state,REST),
        Effects.constant(setTime(getCurrSet(state).get('secs_off')))
      );

    case RECOVER:
      // do we have another set to do on this grip or do we move on to the next one?
      var stateR1 = resetRep(state)
      if (numSetsInExercise(stateR1) === parseInt(getCurrSetOrd(stateR1))) {
        // move on to next exercise
        var stateR2 = incrementExercise(stateR1)
        var stateR3 = resetSet(stateR2)
        return loop(
          changePhase(stateR3,RECOVER),
          Effects.batch([
            Effects.constant(setTime(getCurrSet(stateR3).get('secs_recovery'))),
            Effects.constant(collectSetResults(getCurrSetOrd(stateR1), getSetLabel(stateR1),
                getCurrExerciseId(stateR1), getCurrGripName(stateR1), getNumReps(stateR1),
                getCurrWeight(stateR1), getWorkoutWeight(stateR1))
            )
          ])
        );
      } else {
        // ready for the next set on this grip
        var stateR4 = incrementSet(stateR1)
        return loop(
          changePhase(stateR4,RECOVER),
          Effects.batch([
            Effects.constant(setTime(getCurrSet(stateR4).get('secs_recovery'))),
            Effects.constant(collectSetResults(getCurrSetOrd(stateR1), getSetLabel(stateR1),
                getCurrExerciseId(stateR1), getCurrGripName(stateR1), getNumReps(stateR1),
                getCurrWeight(stateR1), getWorkoutWeight(stateR1))
            )
          ])
        );
      }

    case COMPLETE:
      // TODO move the current session object to history
      return loop(
        changePhase(state,COMPLETE)
          .updateIn(M.COMPLETE, done => true),
          Effects.batch([
            Effects.constant(pause()),
            Effects.constant(collectSetResults(getCurrSetOrd(state), getSetLabel(state),
                getCurrExerciseId(state), getCurrGripName(state), getNumReps(state),
                getCurrWeight(state), getWorkoutWeight(state))
            )
          ])
      )

    case COLLECTRESULTS:
      var struct = Map({'setId': action.setId, 'setLabel': action.setLabel, 'exId': action.exId,
        'grip': action.grip, 'reps': action.reps, 'sessionWeight': action.sessionWeight,
        'workoutWeight': action.workoutWeight})
      return state.mergeIn(M.COLLECT_SET_RESULTS, struct)

    case COLLECTEDRESULTS:
      //action: exId, setId, successfulReps
      var result = Map({[action.exId]: Map({[action.setId]: action.successfulReps})})
      // if we have collected all the results for the workout, copy to history
      var state1 = parseInt(action.exId) === getNumExercises(state) &&
                    parseInt(action.setId) === numSetsInExercise(state)
        ? state.mergeIn([K.HISTORY],Map({[moment().format('MMMM Do YYYY, h:mm:ss a')]:
                                    getSessLastSuccesses(state).merge(result)}))
        : state

      return state1.deleteIn(M.COLLECT_SET_RESULTS)
                  .mergeDeepIn(M.LAST_SUCCESSES, result)

    case ADJUSTWEIGHT:
      // params are:
      // add (boolean) - whether to add or remove weight
      // result (boolean) - whether to adjust the actual workout, or the session
      // if the climber changes this during the set, it should update the session and the workout
      // if the climber changes this during collecting results, it should just update the workout
      var newState = action.result
        ? state.updateIn(['workouts',getWorkoutId(state),'weights',action.exerciseId],
                  weight => action.add ? weight + weightAdjustmentAmount : weight - weightAdjustmentAmount)
                .updateIn([...M.COLLECT_SET_RESULTS,'workoutWeight'],
                  weight => action.add ? weight + weightAdjustmentAmount : weight - weightAdjustmentAmount)
        : state.updateIn([...M.WEIGHTS,action.exerciseId],
                  weight => action.add ? weight + weightAdjustmentAmount : weight - weightAdjustmentAmount)
              .updateIn(['workouts',getWorkoutId(state),'weights',action.exerciseId],
                  weight => action.add ? weight + weightAdjustmentAmount : weight - weightAdjustmentAmount)
              .updateIn(M.CURRENT_WEIGHT,
                weight => action.add ? weight + weightAdjustmentAmount : weight - weightAdjustmentAmount)
      return newState

    case CHANGEGRIP:
      // change the grip in session.grips and workout.grips
      return state.updateIn([...M.GRIPS,getCurrExerciseId(state)], grip => action.newGrip)
                  .updateIn([K.WORKOUTS,getWorkoutId(state),K.GRIPS,
                    getCurrExerciseId(state)], grip => action.newGrip)
                  .updateIn(M.GRIP, grip => getBoard(state).getIn(['grips',action.newGrip,'name']))

    case DONE:  // this action is dispactched from the timer, which doesn't know what it's timing
      return transition(state)

    case RESET:
      return loop(state,Effects.constant(load(state.getIn(M.LAST_WORKOUT_ID))));

    default:
      return state;
  }
}
