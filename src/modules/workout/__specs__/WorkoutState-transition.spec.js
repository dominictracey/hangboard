/*eslint-disable max-nested-callbacks, no-unused-expressions*/
/*eslint-disable no-unused-vars*/

import {Effects} from 'redux-loop-symbol-ponyfill';
import {initialState, dispatch} from '../../../../test/state';
import * as WorkoutStateActions from '../WorkoutState';
import * as TimerStateActions from '../../timer/TimerState'
import {K,M} from '../../../utils/constants'

jest.mock('react-native-keep-awake') //
const keepAwake = require('react-native-keep-awake')
keepAwake.activate = () => console.log('stay awake!')
keepAwake.deactivate = () => console.log('go to sleep!')

jest.mock('react-native-sound', () => 'Sound')
jest.mock('react-native-version-number', () => 'VersionNumber')

describe('WorkoutState transitions', () => {
  const getLoadingValue = state => state.getIn(['workout', 'loading']);
  const getPhaseValue = state => state.getIn(['workout', ...M.PHASE]);
  const getWorkoutValue = state => state.getIn(['workout', 'session', 'workoutId']);
  const getRepValue = state => state.getIn(['workout', 'session', 'currentRep']);
  const getSetValue = state => state.getIn(['workout', 'session', 'currentSet']);
  const getCompleteValue = state => state.getIn(['workout', 'session', 'complete']);

  describe('warmup to prep', () => {
    const [secondState] = dispatch(initialState, WorkoutStateActions.load('2'));
    const [warmupState] = dispatch(secondState, WorkoutStateActions.prep())

    it('should start in prep state', () => {
      expect(getPhaseValue(warmupState)).toEqual(K.PREP)
    })

    const [exerciseState,effects] = dispatch(warmupState, TimerStateActions.done())

    it('should trigger a Exercise side effect', () => {
      expect(effects).toEqual(
         Effects.constant(WorkoutStateActions.exercise())
      );
    });

    const [exerState] = dispatch(exerciseState, WorkoutStateActions.exercise())
    const [restState,effects2] = dispatch(exerState, TimerStateActions.done())

    it('should trigger a Rest side effect', () => {
      expect(effects2).toEqual(
         Effects.constant(WorkoutStateActions.rest())
      );
    });

  });
})
