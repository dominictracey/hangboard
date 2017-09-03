/*eslint-disable no-unused-vars*/
import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import moment from 'moment'
import {K} from '../../utils/constants'
import {tock} from '../workout/WorkoutState'
import {REHYDRATE} from 'redux-persist/constants'

// Initial state
const initialState = Map({
  seconds: 10,
  running: false,
  loading: false,
  timeToRun: 10,
  playTicks: true,
  playBeeps: true,
  nextSound: K.SILENCE,
});

// Actions
export const SET_TIME = 'TimerState/SET_TIME'; // how much time do you want me to count down
export const RESUME = 'TimerState/RESUME'; // unpause
export const PAUSE = 'TimerState/PAUSE'; // stop counting and hold
export const TICK = 'TimerState/TICK'; // move down one second
export const DONE = 'TimerState/DONE'; // we have reached zero
export const RESTART = 'TimerState/RESTART'; // start the timer over
export const SKIP = 'TimerState/SKIP'; // set the timer to 0
const PLAY_TICKS = 'TimerState/PLAY_TICKS'
const PLAY_BEEPS = 'TimerState/PLAY_BEEPS'
const SET_NEXT_SOUND = 'TimerState/SET_NEXT_SOUND'
//export const INIT = 'TimerState/INIT' // start the metronome

// Action creators
export function resume() {
  return {type: RESUME};
}

export function setTime(seconds) {
  return {type: SET_TIME, seconds,};
}

export function pause() {
  return {type: PAUSE};
}

export function tick(seconds) {
  return {type: TICK, seconds};
}

export function done() {
  return {type: DONE};
}

export function restart() {
  return {type: RESTART};
}

export function skip() {
  return {type: SKIP};
}

export function playTicks(on) {
  return {type: PLAY_TICKS, on}
}

export function playBeeps(on) {
  return {type: PLAY_BEEPS, on}
}

export function setNextSound(sound) {
  return {type: SET_NEXT_SOUND, sound}
}

// Reducer
export default function TimerStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case SET_TIME:
      console.log('setting timer to ' + action.seconds)
      return state.update('seconds', seconds => action.seconds)
                  .update('timeToRun', seconds => action.seconds)

    case RESUME:
      return state.update('running', running => true)

    case PAUSE:
      return state.update('running', running => false);

    case TICK:
      if (state.getIn(['running'])) {
        // give the workoutReducer a whack at it too
        return loop(state.update('seconds', seconds => seconds - 1),
                    Effects.constant(tock(state.get('seconds') - 1)))
      } else {
        return state;
      }

    case RESTART:
      return state.update('seconds', secs => state.get('timeToRun'))

    case SKIP:
      return state.update('seconds', secs => 1)

    case PLAY_TICKS:
      return state.update('playTicks', on => action.on)

    case PLAY_BEEPS:
      return state.update('playBeeps', on => action.on)

    case SET_NEXT_SOUND:
      return state.update('nextSound', sound => action.sound)

    default:
      return state;
  }
}
