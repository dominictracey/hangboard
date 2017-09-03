import {Map} from 'immutable';
import {Effects, loop} from 'redux-loop-symbol-ponyfill'
import {K,M} from '../../utils/constants'
import * as timerStateActions from '../timer/TimerState'

/*eslint-disable no-unused-vars*/

// Initial state
const initialState = Map({
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

    default:
      return state;
  }
}
