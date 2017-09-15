import {List, Map} from 'immutable';
import {K} from '../../utils/constants'
import moment from 'moment'
import {NavigationActions} from 'react-navigation'
import {loop, Effects} from 'redux-loop-symbol-ponyfill'

// Initial state
const initialState = List([
  Map({
    [K.HISTORY_LABEL]: K.CURRENT,
  }),
  Map({
    [K.HISTORY_LABEL]: 'Oct 8, 2017 2:42pm',
    [K.BOARD_ID]: 1,
    [K.BOARD_LABEL]: 'Trango Rock Prodigy Training Center',
    [K.PROGRAM_ID]: 3,
    [K.PROGRAM_LABEL]: 'Rock Prodigy Intermediate Program',
    [K.WORKOUT_ID]: 1,
    [K.WORKOUT_LABEL]: 'Rock Prodigy Beginner Workout',
    [K.RESULTS]: Map({
      '1': Map({
        [K.GRIP_ID]: 1,
        [K.GRIP_LABEL]: 'jug',
        [K.SETS]: Map({
          '1': Map({
            [K.SET_LABEL]: '1/1',
            [K.WEIGHT]: 20,
            [K.REPS]: 8,
            [K.LAST_SUCCESS]: 6,
          }),
        }),
      }),
      '2': Map({
        [K.GRIP_ID]: 9,
        [K.GRIP_LABEL]: 'MRP 3F pocket (deep)',
        [K.SETS]: Map({
          '1': Map({
            [K.SET_LABEL]: '1/2',
            [K.WEIGHT]: -10,
            [K.REPS]: 8,
            [K.LAST_SUCCESS]: 8,
          }),
          '2': Map({
            [K.SET_LABEL]: '2/2',
            [K.WEIGHT]: 0,
            [K.REPS]: 6,
            [K.LAST_SUCCESS]: 4,
          }),
        }),
      }),
      '3': Map({
        [K.GRIP_ID]: 9,
        [K.GRIP_LABEL]: 'MRP 3F pocket (deep)',
        [K.SETS]: Map({
          '1': Map({
            [K.SET_LABEL]: '1/2',
            [K.WEIGHT]: -10,
            [K.REPS]: 8,
            [K.LAST_SUCCESS]: 8,
          }),
          '2': Map({
            [K.SET_LABEL]: '2/2',
            [K.WEIGHT]: 0,
            [K.REPS]: 6,
            [K.LAST_SUCCESS]: 4,
          }),
        }),
      }),
      '4': Map({
        [K.GRIP_ID]: 9,
        [K.GRIP_LABEL]: 'MRP 3F pocket (deep)',
        [K.SETS]: Map({
          '1': Map({
            [K.SET_LABEL]: '1/2',
            [K.WEIGHT]: -10,
            [K.REPS]: 8,
            [K.LAST_SUCCESS]: 8,
          }),
          '2': Map({
            [K.SET_LABEL]: '2/2',
            [K.WEIGHT]: 0,
            [K.REPS]: 6,
            [K.LAST_SUCCESS]: 4,
          }),
        }),
      }),
      '5': Map({
        [K.GRIP_ID]: 9,
        [K.GRIP_LABEL]: 'MRP 3F pocket (deep)',
        [K.SETS]: Map({
          '1': Map({
            [K.SET_LABEL]: '1/2',
            [K.WEIGHT]: -10,
            [K.REPS]: 8,
            [K.LAST_SUCCESS]: 8,
          }),
          '2': Map({
            [K.SET_LABEL]: '2/2',
            [K.WEIGHT]: 0,
            [K.REPS]: 6,
            [K.LAST_SUCCESS]: 4,
          }),
        }),
      }),
      '6': Map({
        [K.GRIP_ID]: 9,
        [K.GRIP_LABEL]: 'MRP 3F pocket (deep)',
        [K.SETS]: Map({
          '1': Map({
            [K.SET_LABEL]: '1/2',
            [K.WEIGHT]: -10,
            [K.REPS]: 8,
            [K.LAST_SUCCESS]: 8,
          }),
          '2': Map({
            [K.SET_LABEL]: '2/2',
            [K.WEIGHT]: 0,
            [K.REPS]: 6,
            [K.LAST_SUCCESS]: 4,
          }),
        }),
      }),
    }),
  }),
]);

// Actions
const HISTORY_START_WORKOUT = K.HISTORY_START_WORKOUT
const HISTORY_RECORD_SET = K.HISTORY_RECORD_SET
const HISTORY_DELETE_SET = K.HISTORY_DELETE_SET
const HISTORY_UPDATE_SET = K.HISTORY_UPDATE_SET
const HISTORY_COMPLETE_WORKOUT = K.HISTORY_COMPLETE_WORKOUT

// Action creators
export function startWorkout(boardId, boardLabel, programId, programLabel) {
  return {type: HISTORY_START_WORKOUT, boardId, boardLabel, programId, programLabel}
}

export function recordSet(exId, setId, setLabel, gripLabel, reps, lastSuccess, weight, note) {
  return {type: HISTORY_RECORD_SET,exId, setId, setLabel, gripLabel, reps, lastSuccess, weight, note}
}

export function deleteSet(index) {
  return {type: HISTORY_DELETE_SET, index}
}

export function updateSet(exId, setId, gripId, gripLabel, reps, lastSuccess, weight, note) {
  return {type: HISTORY_UPDATE_SET,exId, setId, gripId, gripLabel, reps, lastSuccess, weight, note}
}

export function completeWorkout(timestamp) {
  return {type: HISTORY_COMPLETE_WORKOUT, timestamp}
}

function moveCurrentOut(state) {
  // the first item in the history List should always be the current Map
  if (!state.first().get(K.HISTORY_LABEL) === K.CURRENT) {
    return state.shift(Map({[K.HISTORY_LABEL]: K.CURRENT, [K.RESULTS]: Map({})}))
  }

  // only save if there is something to save
  if (!state.first().get(K.RESULTS) || state.first().get(K.RESULTS).size === 0) {
    return state
  } else {
    // relabel the Current (first) history item with the current Date
    // and put a new empty history item at the beginning of the list
    const timestamp = moment().format('MMM Do YYYY, h:mm a')
    const toSave = state.first()
    /*eslint-disable no-unused-vars*/
    const timestamped = toSave.update(K.HISTORY_LABEL,label => timestamp)
    /*eslint-enable no-unused-vars*/
    const state1 = state.shift()
    const state2 = state1.unshift(timestamped)
    return state2.unshift(Map({[K.HISTORY_LABEL]: K.CURRENT,}))
  }

}

// Reducer
export default function HistoryStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case HISTORY_START_WORKOUT:
      // move anything in current to history
      var state1 = moveCurrentOut(state)

      var newSesh = Map({
        [K.HISTORY_LABEL]: K.CURRENT,
        [K.BOARD_ID]: action.boardId,
        [K.BOARD_LABEL]: action.boardLabel,
        [K.PROGRAM_ID]: action.programId,
        [K.PROGRAM_LABEL]: action.programLabel,
        [K.WORKOUT_ID]: action.workoutId,
        [K.WORKOUT_LABEL]: action.workoutLabel,
        [K.RESULTS]: Map({}),
      })
      var shifted = state1.shift()
      return shifted.unshift(newSesh)
    case HISTORY_RECORD_SET:
      // merge a new set into current
      var newSet =
        Map({
          [action.exId]: Map({
            [K.GRIP_LABEL]: action.gripLabel,
            [K.SETS]: Map({
              [action.setId]: Map({
                [K.SET_LABEL]: action.setLabel,
                [K.WEIGHT]: action.weight,
                [K.REPS]: action.reps,
                [K.LAST_SUCCESS]: action.lastSuccess,
                [K.NOTE]: action.note,
              }),
            })
          })
        })
      var newResults = state.first().get(K.RESULTS).mergeDeep(newSet)
      var newSession = state.first().set(K.RESULTS,newResults)
      // with a List, we can't update the existing element? We have to
      // shift the first element off and unshift the new one on?
      shifted = state.shift()
      return shifted.unshift(newSession)
    case HISTORY_DELETE_SET:
      // delete the set specified by action.index from history
      // and go back to history list
      var backAction = NavigationActions.back({})

      return loop(state.delete(action.index),
                  Effects.constant(backAction))
    case HISTORY_UPDATE_SET:
      // update the set specified by action.key with the new values
      return state
    case HISTORY_COMPLETE_WORKOUT:
      // move current to a timestamped key and recreate an empty current
      return moveCurrentOut(state)
    default:
      return state;
  }
}
