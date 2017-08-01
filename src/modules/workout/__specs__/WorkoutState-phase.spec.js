/*eslint-disable max-nested-callbacks, no-unused-expressions*/

import {Effects} from 'redux-loop-symbol-ponyfill';
import {initialState, dispatch} from '../../../../test/state';
import * as WorkoutStateActions from '../WorkoutState';
import * as TimerStateActions from '../../timer/TimerState'
describe('WorkoutState', () => {
  const getLoadingValue = state => state.getIn(['workout', 'loading']);
  const getPhaseValue = state => state.getIn(['workout', 'session', 'currentPhase']);
  const getWorkoutValue = state => state.getIn(['workout', 'session', 'workoutId']);
  const getRepValue = state => state.getIn(['workout', 'session', 'currentRep']);
  const getSetValue = state => state.getIn(['workout', 'session', 'currentSet']);
  const getCompleteValue = state => state.getIn(['workout', 'session', 'complete']);

  describe('load', () => {
    const [secondState,effects] = dispatch(initialState, WorkoutStateActions.load('1'));

    it('should start the loading', () => {
      expect(getLoadingValue(initialState)).toBe(false);
      expect(getLoadingValue(secondState)).toBe(true);
    });

    it('should trigger a WARMUP side effect', () => {
      expect(effects).toEqual(
         Effects.constant(WorkoutStateActions.warmup())
      );
    });

    it('should set the workoutId for the session', () => {
      expect(getWorkoutValue(initialState)).toBe('0');
      expect(getWorkoutValue(secondState)).toBe('1');
    });
  });

  describe('bad load', () => {
    const [secondState,effects] = dispatch(initialState, WorkoutStateActions.load('99'));

    it('should not load a bad id', () => {
      expect(getWorkoutValue(initialState)).toBe('0');
      expect(getWorkoutValue(secondState)).toBe('0'); //unmodified
    });

    it('should not trigger a WARMUP side effect', () => {
      expect(effects).toEqual(
         Effects.none()
      );
    });
  });

  describe('warmup', () => {
    const [secondState,effects] = dispatch(initialState, WorkoutStateActions.warmup());

    it('should move to warmup phase', () => {
      expect(getPhaseValue(initialState)).toBe('Init');
      expect(getPhaseValue(secondState)).toBe('Warmup');
    });

    it('should trigger a warmup setTime side effect', () => {
      expect(effects).toEqual(
         Effects.constant(TimerStateActions.setTime(secondState.getIn(['workout','programs',
           secondState.getIn(['workout','session','workout']).toString(),'warmup_secs'])))
      );
    });
  })

  describe('exercise', () => {
    const [secondState,effects] = dispatch(initialState, WorkoutStateActions.exercise());

    it('should move to exercise phase', () => {
      expect(getPhaseValue(initialState)).toBe('Init');
      expect(getPhaseValue(secondState)).toBe('Exercise');
      expect(getRepValue(secondState)).toBe('1');
      expect(getSetValue(secondState)).toBe('1');
    });

    it('should trigger a exercise setTime side effect', () => {
      expect(effects).toEqual(
         Effects.constant(TimerStateActions.setTime(
           WorkoutStateActions.getCurrSet(secondState.get('workout')).get('secs_on'))
         )
      );
    });
  })

  describe('rest', () => {
    const [secondState,effects] = dispatch(initialState, WorkoutStateActions.rest());

    it('should move to rest phase', () => {
      expect(getPhaseValue(initialState)).toBe('Init');
      expect(getPhaseValue(secondState)).toBe('Rest');
      expect(getRepValue(secondState)).toBe('0');
      expect(getSetValue(secondState)).toBe('1');
    });

    it('should trigger a rest setTime side effect', () => {
      expect(effects).toEqual(
         Effects.constant(TimerStateActions.setTime(
           WorkoutStateActions.getCurrSet(secondState.get('workout')).get('secs_off'))
         )
      );
    });
  })

  describe('complete', () => {
    const [secondState,effects] = dispatch(initialState, WorkoutStateActions.complete());

    it('should move to complete phase', () => {
      expect(getPhaseValue(initialState)).toBe('Init')
      expect(getPhaseValue(secondState)).toBe('Complete')
    })

    it('should set session state to complete', () => {
      expect(getCompleteValue(secondState)).toBe(true)
    })

    it('should trigger a timer pause side effect', () => {
      expect(effects).toEqual(
         Effects.constant(TimerStateActions.pause())
      );
    });
  })

});
