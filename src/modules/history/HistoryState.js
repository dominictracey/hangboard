import {Map} from 'immutable';
import {K,M} from '../../utils/constants'

// Initial state
const initialState = Map({
  'Oct 8, 2017 2:42pm': Map({
    [K.BOARDID]: 1,
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
});

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

export function recordSet(exId, setId, gripId, gripLabel, reps, lastSuccess, weight, note) {
  return {type: HISTORY_RECORD_SET,exId, setId, gripId, gripLabel, reps, lastSuccess, weight, note}
}

export function deleteSet(exId, setId) {
  return {type: HISTORY_DELETE_SET, exId, setId}
}

export function updateSet(exId, setId, gripId, gripLabel, reps, lastSuccess, weight, note) {
  return {type: HISTORY_UPDATE_SET,exId, setId, gripId, gripLabel, reps, lastSuccess, weight, note}
}

export function completeWorkout(timestamp) {
  return {type: HISTORY_COMPLETE_WORKOUT, timestamp}
}

// Reducer
export default function HistoryStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case HISTORY_START_WORKOUT:
      return state;
    case HISTORY_RECORD_SET:
      return state;
    case HISTORY_DELETE_SET:
      return state;
    case HISTORY_UPDATE_SET:
      return state;
    case HISTORY_COMPLETE_WORKOUT:
      return state;
    default:
      return state;
  }
}
