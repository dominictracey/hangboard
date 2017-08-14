/*eslint-disable no-unused-vars*/
import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';

// Initial state
const initialState = Map({
  seconds: 10,
  running: false,
  loading: false,
  timeToRun: 10,
});

// Actions
export const SET_TIME = 'TimerState/SET_TIME'; // how much time do you want me to count down
const RESUME = 'TimerState/RESUME'; // unpause
const PAUSE = 'TimerState/PAUSE'; // stop counting and hold
const TICK = 'TimerState/TICK'; // move down one second
export const DONE = 'TimerState/DONE'; // we have reached zero
const RESTART = 'TimerState/RESTART'; // start the timer over
const SKIP = 'TimerState/SKIP'; // set the timer to 0
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

export function tick() {
  return {type: TICK};
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

// export function init() {
//   return {type: INIT};
// }
//
// // heartbeat
// function heartbeat() {
//   setTimeout(() => {
//     tick()
//     heartbeat()
//   }, 1000)
// }

//
// async function doTick() {
//   return new Promise((res) => setTimeout(res, 1000));
// }
//
// //
// export async function nextTick() {
//   return {
//     type: TICK,
//     payload: await doTick()
//   };
// }

// Reducer
export default function TimerStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TIME:
      return state.update('seconds', seconds => action.seconds)
                  .update('timeToRun', seconds => action.seconds)

    case RESUME:
      return state.update('running', running => true)

    case PAUSE:
      return state.update('running', running => false);

    case TICK:
      if (state.getIn(['running'])) {
        if (state.getIn(['seconds']) === 1) {
          return loop(
            state,
            Effects.constant({type: DONE})
          );
        } else {
          return state.update('seconds', seconds => seconds - 1)
        }
      } else {
        return state;
      }

    case RESTART:
      return state.update('seconds', secs => state.get('timeToRun'))

    case SKIP:
      return state.update('seconds', secs => 1)

    default:
      return state;
  }
}
