import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
//import {generateRandomNumber} from '../../services/randomNumberService';
import * as WorkoutStateActions from '../workout/WorkoutState';

// Initial state
const initialState = Map({
  seconds: 10,
  running: false,
  loading: false
});

// Actions
export const SET_TIME = 'TimerState/SET_TIME'; // how much time do you want me to count down
const RESUME = 'TimerState/RESUME'; // unpause
const PAUSE = 'TimerState/PAUSE'; // stop counting and hold
const TICK = 'TimerState/TICK'; // move down one second
export const DONE = 'TimerState/DONE'; // we have reached zero
//export const INIT = 'TimerState/INIT' // start the metronome

// Action creators
export function resume() {
  return {type: RESUME};
}

export function setTime(seconds) {
  return {type: SET_TIME, seconds: seconds};
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
      //return loop(
      return state.update('seconds', seconds => action.seconds)
      //  Effects.promise(nextTick)
      //);

    case RESUME:
      //return loop(
      return state.update('running', running => true)
        //Effects.promise(nextTick)
    //  );

    case PAUSE:
      return state.update('running', running => false);

    case TICK:
      if (state.getIn(['running'])) {
        if (state.getIn(['seconds']) === 0) {
          return loop(
            state,
            Effects.constant({type: DONE})
          );
        } else {
          //return loop(
          return state.update('seconds', seconds => seconds - 1)
          //   Effects.promise(nextTick)
          // );
        }
      } else {
        return state;
      }
    //
    // case INIT:
    //   heartbeat()
    //   return state;

    default:
      return state;
  }
}
