import {Map} from 'immutable';
import {Effects, loop} from 'redux-loop-symbol-ponyfill'
import {K,M} from '../../utils/constants'
import * as timerStateActions from '../timer/TimerState'
import * as workoutStateActions from '../workout/WorkoutState'
import * as configurationStateActions from '../static/StaticState'

/*eslint-disable no-unused-vars*/

// Initial state
const initialState = Map({
  [K.DEFAULT_PROGRAM_ID]: '1',
  [K.DEFAULT_BOARD_ID]: '1',
  [K.SOUNDS]: Map({
    [K.TICKS_FOR]: Map({
      [K.WARMUP]: false,
      [K.PREP]: true,
      [K.EXERCISE]: true,
      [K.REST]: false,
      [K.RECOVER]: false,
    }),
    [K.BEEPS_FOR]: Map({
      [K.WARMUP]: true,
      [K.PREP]: true,
      [K.EXERCISE]: false,
      [K.REST]: true,
      [K.RECOVER]: true,
    }),
  })
});

// Actions
const UPDATE_TICKS_FOR = 'SettingsState/UPDATE_TICKS_FOR';
const UPDATE_BEEPS_FOR = 'SettingsState/UPDATE_BEEPS_FOR';
export const NEED_NEW_SOUND = 'SettingsState/NEED_NEW_SOUND'
const SET_DEFAULT_PROGRAM = 'SettingsState/SET_DEFAULT_PROGRAM'
const SET_DEFAULT_BOARD = 'SettingsState/SET_DEFAULT_BOARD'

// Action creators
export function updateTicksFor(phase, on) {
  return {type: UPDATE_TICKS_FOR, phase, on}
}
export function updateBeepsFor(phase, on) {
  return {type: UPDATE_BEEPS_FOR, phase, on}
}

// query functions
export function needNewSound(phase, seconds) {
  return {type: NEED_NEW_SOUND, phase, seconds}
}

export function setDefaultProgram(programId) {
  return {type: SET_DEFAULT_PROGRAM, programId}
}

export function setDefaultBoard(boardId) {
  return {type: SET_DEFAULT_BOARD, boardId}
}

getDefaultBoardId = (state) => state.get('defaultBoardId')
getDefaultProgramId = (state) => state.get('defaultProgramId')

// Reducer
export default function SettingsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_TICKS_FOR:
      return state.updateIn([...M.TICKS_FOR,action.phase],bool => action.on);
    case UPDATE_BEEPS_FOR:
      return state.updateIn([...M.BEEPS_FOR,action.phase],bool => action.on);
    case NEED_NEW_SOUND:
      var sound = 'NONE'
      var playTicks = state.getIn([...M.TICKS_FOR,action.phase])
      var playBeeps = state.getIn([...M.BEEPS_FOR,action.phase])

      if (action.seconds <= 4 && playBeeps) {
        sound = K.BEEPS
      } else if (playTicks) {
        sound = K.TICKS
      }
      //console.log('setting sound to ' + sound + ' for seconds ' + action.seconds + ' in phase ' + action.phase + ', ticks/beeps ' + playTicks + '/' + playBeeps)
      return loop(state, Effects.constant(timerStateActions.setNextSound(sound)))
    case SET_DEFAULT_PROGRAM:
      return loop(state.update('defaultProgramId',dpid => action.programId),
                  Effects.constant(workoutStateActions.createWorkout(action.programId, this.getDefaultBoardId(state))))
    case SET_DEFAULT_BOARD:
      return loop(state.update('defaultBoardId',bid => action.boardId),
                  Effects.batch([
                    Effects.constant(configurationStateActions.loadBoard(action.boardId)),
                    Effects.constant(workoutStateActions.createWorkout(this.getDefaultProgramId(state), action.boardId))
                  ])
                )

    default:
      return state;
  }
}
