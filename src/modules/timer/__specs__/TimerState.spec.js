/*eslint-disable max-nested-callbacks, no-unused-expressions*/

import {Effects} from 'redux-loop-symbol-ponyfill';
import {initialState, dispatch} from '../../../../test/state';
import * as TimerStateActions from '../TimerState';

describe('TimerState', () => {

  describe('resume', () => {
    const getValue = state => state.getIn(['timer', 'running']);

    it('should start the timer', () => {
      const [secondState] = dispatch(initialState, TimerStateActions.resume());
      expect(getValue(initialState)).toBe(false);
      expect(getValue(secondState)).toBe(true);
    });
  });

  describe('pause', () => {
    const getValue = state => state.getIn(['timer', 'running']);

    it('should pause the timer', () => {
      const [secondState] = dispatch(initialState, TimerStateActions.pause());
      expect(getValue(initialState)).toBe(false);
      expect(getValue(secondState)).toBe(false);
    });
  });

  describe('pause', () => {
    const getValue = state => state.getIn(['timer', 'running']);

    it('should pause the timer', () => {
      const [secondState] = dispatch(initialState, TimerStateActions.resume());
      const [thirdState] = dispatch(initialState, TimerStateActions.pause());
      expect(getValue(initialState)).toBe(false);
      expect(getValue(secondState)).toBe(true);
      expect(getValue(thirdState)).toBe(false);
    });
  });

  describe('tick', () => {
    const getValue = state => state.getIn(['timer', 'seconds']);

    it('shouldn\'t decrement the paused non-zero timer', () => {
      const [secondState] = dispatch(initialState, TimerStateActions.tick());
      expect(getValue(initialState)).toBe(10);
      expect(getValue(secondState)).toBe(10);
    });
  });

  describe('set_time', () => {
    const getValue = state => state.getIn(['timer', 'seconds']);

    it('should set the seconds on the timer', () => {
      const [secondState] = dispatch(initialState, TimerStateActions.setTime(77));
      expect(getValue(initialState)).toBe(10);
      expect(getValue(secondState)).toBe(77);
    });
  });

  describe('tick', () => {
    const getValue = state => state.getIn(['timer', 'seconds']);

    it('should decrement the running non-zero timer', () => {
      const [runState] = dispatch(initialState, TimerStateActions.resume());
      const [secondState] = dispatch(runState, TimerStateActions.tick());
      expect(getValue(initialState)).toBe(10);
      expect(getValue(secondState)).toBe(9);
    });
  });

  describe('tick', () => {
    const getValue = state => state.getIn(['timer', 'seconds']);
    const statezero = initialState.updateIn(['timer','seconds'],sec => 1)
    const [runState] = dispatch(statezero, TimerStateActions.resume());
    const [secondState, effects] = dispatch(runState, TimerStateActions.tick());

    it('should not decrement the running zero timer but generate a DONE effect', () => {
      expect(getValue(statezero)).toBe(1);
      expect(getValue(secondState)).toBe(1);
    });

    it('should trigger a DONE side effect', () => {
      expect(effects).toEqual(
         Effects.constant(TimerStateActions.done())
      );
    });
  });
});
