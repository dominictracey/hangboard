/*eslint-disable max-nested-callbacks, no-unused-expressions*/

import {Effects} from 'redux-loop-symbol-ponyfill';
import {initialState, dispatch} from '../../../../test/state';
import * as WorkoutStateActions from '../WorkoutState';
import * as TimerStateActions from '../../timer/TimerState'

describe('WorkoutState transitions', () => {
  const getLoadingValue = state => state.getIn(['workout', 'loading']);
  const getPhaseValue = state => state.getIn(['workout', 'session', 'currentPhase']);
  const getWorkoutValue = state => state.getIn(['workout', 'session', 'workout']);
  const getRepValue = state => state.getIn(['workout', 'session', 'currentRep']);
  const getSetValue = state => state.getIn(['workout', 'session', 'currentSet']);
  const getCompleteValue = state => state.getIn(['workout', 'session', 'complete']);

  describe('warmup to exercise', () => {
    const [secondState] = dispatch(initialState, WorkoutStateActions.load('1'));

    const [warmupState] = dispatch(secondState, WorkoutStateActions.warmup())

    it('should start in warmup state', () => {
      expect(getPhaseValue(warmupState)).toEqual('Warmup')
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
