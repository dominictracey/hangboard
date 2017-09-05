/*eslint-disable no-unused-vars*/
import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {K} from '../../utils/constants'
import {tock} from '../workout/WorkoutState'

// Initial state
const initialState = Map({
  seconds: 10,
  running: false,
  loading: false,
  timeToRun: 10,
  nextSound: K.SILENCE,
});

// Actions
export const SET_TIME = 'TimerState/SET_TIME'; // how much time do you want me to count down
export const RESUME = 'TimerState/RESUME'; // unpause
export const PAUSE = 'TimerState/PAUSE'; // stop counting and hold
export const TICK = 'TimerState/TICK'; // move down one second
export const RESTART = 'TimerState/RESTART'; // start the timer over
export const SKIP = 'TimerState/SKIP'; // set the timer to 0
export const SET_NEXT_SOUND = 'TimerState/SET_NEXT_SOUND'

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

export function tick() {
  return {type: TICK};
}

export function restart() {
  return {type: RESTART};
}

export function skip() {
  return {type: SKIP};
}

export function setNextSound(sound) {
  return {type: SET_NEXT_SOUND, sound}
}

// Reducer
export default function TimerStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case SET_TIME:
      return state.update(K.SECONDS, seconds => action.seconds)
                  .update('timeToRun', seconds => action.seconds)

    case RESUME:
      return state.update('running', running => true)

    case PAUSE:
      return state.update('running', running => false);

    case TICK:
      if (state.getIn(['running'])) {
        // give the workoutReducer a whack at it too
        return loop(state.update(K.SECONDS, seconds => seconds - 1),
                      Effects.constant(tock(state.get(K.SECONDS) - 1)))
      } else {
        return state
      }

    case RESTART:
      return state.update(K.SECONDS, secs => state.get('timeToRun'))

    case SKIP:
      return state.update(K.SECONDS, secs => 1)

    case SET_NEXT_SOUND:
      return state.update('nextSound', sound => action.sound)

    default:
      return state;
  }
}
