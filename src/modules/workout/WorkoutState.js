import {fromJS} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {DONE, setTime, pause} from '../timer/TimerState';

// Initial state
// All keys are strings per https://github.com/facebook/immutable-js/issues/282
const initialState = fromJS({
  boards: {
    '0': {
      name: 'Trango Split Board',
      grips: {
        '0': {
          name: 'jug'
        },
        '1': {
          name: 'big crimp (in)'
        },
        '2': {
          name: 'big crimp (out)'
        },
        '3': {
          name: 'little crimp (in)'
        },
        '4': {
          name: 'sloper'
        },
        '5': {
          name: 'IMR 2-pad 3F'
        },
        '6': {
          name: 'wide pinch'
        },
        '7': {
          name: 'narrow pinch'
        }
      }
    }
  },
  sets: {
    '0': {
      description: '10 on/5 off x 6',
      source: 'Rock Prodigy - beginner',
      reps: 6,
      secs_on: 10,
      secs_off: 5,
      secs_recovery: 180,
      baseline_plus: 0
    },
    '1': {
      description: '7 on/3 off x 7',
      source: 'Rock Prodigy - intermediate 1',
      reps: 7,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 0
    },
    '2': {
      description: '7 on/3 off x 6 - baseline+10',
      source: 'Rock Prodigy - intermediate 2',
      reps: 6,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 10
    },
    '3': {
      description: '7 on/3 off x 5 - baseline+20',
      source: 'Rock Prodigy - advanced 3',
      reps: 5,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 20
    },
    '4': {
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
    '0': {
      title: 'Rock Prodigy Beginner Program on Trango Split',
      author: 'Manderson',
      level: 'beginner',
      board: '0',
      warmup_secs: 5,
      exercises: {
        '1': {
          grip: '0',
          sets: {
            '1': '0'
          }
        },
        '2': {
          grip: '1',
          sets: {
            '1': '0'
          }
        },
        '3': {
          grip: '2',
          sets: {
            '1': '0'
          }
        },
        '4': {
          grip: '3',
          sets: {
            '1': '0'
          }
        },
        '5': {
          grip: '4',
          sets: {
            '1': '0'
          }
        },
        '6': {
          grip: '5',
          sets: {
            '1': '0'
          },
        },
      },
    },
    '1': {
      title: 'TEST PROGRAM ON TRANGO SPLIT',
      author: 'DPT',
      level: 'advanced',
      board: '0',
      warmup_secs: 3,
      exercises: {
        '1': {
          grip: '0',
          sets: {
            '1': '4'
          }
        },
        '2': {
          grip: '1',
          sets: {
            '1': '4'
          }
        },
        '3': {
          grip: '2',
          sets: {
            '1': '4'
          }
        },
      },
    },
  },
    // everything below here should be user configurable
  workouts: {
    '0': {
      name: 'My hangboard routine',
      program: '0',
      weights: {
        '0': {'0': 0},
        '1': {'0': 0},
        '2': {'0': 0},
        '3': {'0': -10},
        '4': {'0': -10},
        '5': {'0': -20},
      }
    },
    '1': {
      name: 'Test hangboard routine',
      program: '1',
      weights: {
        '0': {'0': 0},
        '1': {'0': 10},
        '2': {'0': -10},
      }
    }
  },

  session: {
    workout: '1',
    currentExercise: '1',
    currentSet: '1',
    currentRep: '0',
    currentPhase: 'Warmup',
    setLabel: '1/1',
    weights: {
      '0': {'0': 0},
      '1': {'0': 0},
      '2': {'0': 0},
      '3': {'0': -10},
      '4': {'0': -10},
      '5': {'0': -20},
    },
    grip: '--',
    complete: false,
  },

  history: {

  },
  loading: false
});

// Actions
const LOAD = 'WorkoutState/LOAD';  // get ready to rock it
const START = 'WorkoutState/START';  // workout begins
const WARMUP = 'WorkoutState/WARMUP';
const EXERCISE = 'WorkoutState/EXERCISE';
const REST = 'WorkoutState/REST';
const RECOVER = 'WorkoutState/RECOVER';
const COMPLETE = 'WorkoutState/COMPLETE'; // the workout is done
const RESET = 'TimerState/RESET'; // re-establish the initialState

const PhaseLabels = {
  [WARMUP]: 'Warmup',
  [EXERCISE]: 'Exercise',
  [REST]: 'Rest',
  [RECOVER]: 'Recovery',
  [COMPLETE]: 'Complete',
};

// Action creators
export function load() {
  return {type: LOAD};
}

export function start() {
  return {type: START};
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

// Reducer
export default function WorkoutStateReducer(state = initialState, action = {}) {

  const workoutId = state.getIn(['session','workout']);
  const workout = state.getIn(['workouts',workoutId]);
  const program = state.getIn(['programs',workout.get('program')]);
  //const board = state.getIn(['boards',program.board]);
  const currExercise = state.getIn(['session','currentExercise']);
  //const exercise = program.exercises[currExercise];
  const currSet = state.getIn(['session','currentSet']);
  const currRep = state.getIn(['session','currentRep']);
  const setId = state.getIn(['programs',workout.get('program'),'exercises',currExercise,'sets',currSet]);
  const set = state.getIn(['sets',setId]);
  const setLabel = currExercise + '/' + currSet;

  switch (action.type) {
    case LOAD:
      return loop(
        state.update('loading',loading => true),
        Effects.constant(warmup())
      );

    //case START:
      // do we need this?

    case WARMUP:
      return loop(
        state.update('loading',loading => false)
        .updateIn(['session','currentPhase'], phase => PhaseLabels[WARMUP])
        .updateIn(['session','currentRep'], rep => '0')
        .updateIn(['session','currentSet'], cset => '1')
        .updateIn(['session','grip'], grip => state.getIn(['boards',program.get('board'),'grips','0','name'])),
        Effects.constant(setTime(program.get('warmup_secs')))
      );

    case EXERCISE:
      return loop(
        state.updateIn(['session','currentPhase'], phase => PhaseLabels[EXERCISE])
          .updateIn(['session','currentRep'], rep => rep === '0' ? '1' : parseInt(rep) + 1),
        Effects.constant(setTime(set.get('secs_on')))
      );

    case REST:
      return loop(
        state.updateIn(['session','currentPhase'], phase => PhaseLabels[REST]),
        Effects.constant(setTime(set.get('secs_off')))
      );

    case RECOVER:
      // do we have another set to do on this hold or do we move on to the next one?
      if (state.getIn(['programs',workout.get('program'),'exercises',currExercise,'sets']).count() === parseInt(currSet)) {
        // move on to next exercise
        var newEx = parseInt(currExercise) + 1  //note we shouldn't recover after last set
        var newGripId = state.getIn(['programs',workout.get('program'),'exercises',newEx.toString(),'grip'])
        return loop(
          state.updateIn(['session','currentPhase'], phase => PhaseLabels[RECOVER])
            .updateIn(['session','currentRep'], rep => '0')
            .updateIn(['session','currentExercise'], exercise => newEx.toString())
            .updateIn(['session','currentSet'], cset => '1')
            .updateIn(['session','setLabel'], label => parseInt(currExercise) + 1 + '/1')
            .updateIn(['session','grip'], grip => state.getIn(['boards',program.get('board'),'grips',newGripId,'name'])),
          Effects.constant(setTime(set.get('secs_recovery')))
        );
      } else {
        return loop(
          state.updateIn(['session','currentPhase'], phase => PhaseLabels[RECOVER])
            .updateIn(['session','currentRep'], rep => '0')
            .updateIn(['session','currentSet'], cset => parseInt(cset) + 1)
            .updateIn(['session','setLabel'], label => setLabel)
            .updateIn('session','grip', grip => state.getIn(['boards',program.get('board'),'grips',currSet,'name'])),
          Effects.constant(setTime(set.get('secs_recovery')))
        );
      }

    case COMPLETE:
      // move the current session object to history
      return loop(
        state.updateIn(['session','complete'], done => true)
          .updateIn(['session','currentPhase'], phase => PhaseLabels[COMPLETE]),
        Effects.constant(pause()) // stop the clock
      )

    case DONE:  // this action is dispactched from the timer, which doesn't know what it's timing
      // we only want to figure out the next phase to go to here, and get going that way
      if (state.getIn(['session','currentPhase']) === PhaseLabels[WARMUP]) {
        // move on to exercise
        return loop(state,Effects.constant(exercise()));
      } else if (state.getIn(['session','currentPhase']) === PhaseLabels[EXERCISE]) {
        // move on to rest or recovery
        if (set.get('reps') === currRep) {
          if (program.get('exercises').count() === parseInt(currExercise)) {
            return loop(state,Effects.constant(complete()));
          } else {
            return loop(state,Effects.constant(recover()));
          }
        } else {
          return loop(state,Effects.constant(rest()));
        }
      } else if (state.getIn(['session','currentPhase']) === PhaseLabels[REST]) {
        return loop(state,Effects.constant(exercise()));
      } else {  // recovery presumably
        return loop(state,Effects.constant(exercise()));
      }

    case RESET:
      return initialState;

    default:
      return state;
  }
}
