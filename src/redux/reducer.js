import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop-symbol-ponyfill';

import NavigatorStateReducer from '../modules/navigator/NavigatorState';
import TimerStateReducer from '../modules/timer/TimerState';
import WorkoutStateReducer from '../modules/workout/WorkoutState'
import StaticStateReducer from '../modules/static/StaticState'
import SessionStateReducer, {RESET_STATE} from '../modules/session/SessionState';
import SettingsReducer from '../modules/settings/SettingsState';
import HistoryReducer from '../modules/history/HistoryState';

import {REHYDRATE} from 'redux-persist-immutable/constants'
import {K} from '../utils/constants'

const reducers = {

  timer: TimerStateReducer,
  [K.CONFIGURATION]: StaticStateReducer,
  settings: SettingsReducer,
  workout: WorkoutStateReducer,
  history: HistoryReducer,

  // Navigator states
  navigatorState: NavigatorStateReducer,

  session: SessionStateReducer

};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  // redux-loop doesn't play well with redux-persist-immutable
  if (action.type === REHYDRATE) {
    return nextState
  }
  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
