/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   22-07-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

/*eslint-disable max-nested-callbacks, no-unused-expressions*/
import {Effects} from 'redux-loop-symbol-ponyfill';
import {initialState, dispatch} from '../../../../test/state';
import * as WorkoutStateActions from '../WorkoutState';
import * as TimerStateActions from '../../timer/TimerState'
import {Map} from 'immutable'
import {K,M} from '../../../utils/constants'

jest.mock('react-native-keep-awake') //
const keepAwake = require('react-native-keep-awake')
keepAwake.activate = () => console.log('stay awake!')
keepAwake.deactivate = () => console.log('go to sleep!')

jest.mock('react-native-sound', () => 'Sound')
jest.mock('react-native-version-number', () => 'VersionNumber')

/**
 * @jest-environment jsdom
 */
describe('WorkoutState', () => {

  const getLoadingValue = state => state.getIn([K.WORKOUT, 'loading']);
  const getPhaseValue = state => state.getIn([K.WORKOUT, ...M.PHASE]);
  const getWorkoutIdValue = state => state.getIn([K.WORKOUT, ...M.WORKOUT_ID]);
  const getProgramIdValue = (state, workoutId) => state.getIn([K.WORKOUT, K.WORKOUTS, workoutId, K.PROGRAM]);
  const getWorkoutsValue = state => state.getIn([K.WORKOUT,K.WORKOUTS]);
  const getRepValue = state => state.getIn([K.WORKOUT, ...M.CURRENT_REP]);
  const getSetOrdValue = state => state.getIn([K.WORKOUT, ...M.CURRENT_SET_ORD]);
  const getCompleteValue = state => state.getIn([K.WORKOUT, ...M.COMPLETED]);
  const getSetIdValue = state => state.getIn([K.WORKOUT, ...M.CURRENT_SET_ID]);
  const getExerciseIdValue = state => state.getIn([K.WORKOUT, ...M.CURRENT_EXERCISE_ID]);
  const getGripValue = state => state.getIn([K.WORKOUT, ...M.GRIP]);
  const getWeightValue = state => state.getIn([K.WORKOUT, ...M.WEIGHTS,
    state.getIn([K.WORKOUT,...M.CURRENT_EXERCISE_ID])])
  const getSetResultCollectionValue = state => state.getIn([K.WORKOUT, ...M.COLLECT_SET_RESULTS])
  const getResultsValue = state => state.getIn([K.WORKOUT, ...M.LAST_SUCCESSES])
  const getHistoryValue = state => state.getIn([K.WORKOUT, K.HISTORY])
  const getSessionGrips = state => state.getIn([K.WORKOUT, ...M.GRIPS])
  const getWorkoutGrips = (state, workoutId) => state.getIn([K.WORKOUT, K.WORKOUTS, workoutId, K.GRIPS])
  const getCurrentGrip = state => state.getIn([K.WORKOUT,...M.GRIP])
  const getColorValue = state => state.getIn([K.WORKOUT,...M.COLOR])

  describe('load', () => {
    const [secondState,effects] = dispatch(initialState, WorkoutStateActions.load('4'));

    it('should start the loading', () => {
      expect(getLoadingValue(initialState)).toBe(false);
      expect(getLoadingValue(secondState)).toBe(true);
    });

    it('should set the workoutId for the session', () => {
      expect(getWorkoutIdValue(initialState)).toBe('-');
      expect(getWorkoutIdValue(secondState)).toBe('4');
    });

    it('should set the setOrd for the session', () => {
      expect(getSetOrdValue(initialState)).toBe('-');
      expect(getSetOrdValue(secondState)).toBe('1');
    });

    it('should have an empty color', () => {
      expect(getColorValue(initialState)).toBe('')
      expect(getColorValue(secondState)).toBe('')
    })
  });

  describe('bad load', () => {
    const [secondState,effects] = dispatch(initialState, WorkoutStateActions.load('99'));

    it('should not load a bad id', () => {
      expect(getWorkoutIdValue(initialState)).toBe('-');
      expect(getWorkoutIdValue(secondState)).toBe('-'); //unmodified
    });

    it('should not trigger a WARMUP side effect', () => {
      expect(effects).toEqual(
         Effects.none()
      );
    });
  });

  describe('warmup', () => {
    const [firstState] = dispatch(initialState, WorkoutStateActions.load('4'));
    const [secondState,effects] = dispatch(firstState, WorkoutStateActions.warmup());

    it('should move to warmup phase', () => {
      expect(getPhaseValue(initialState)).toBe(K.INIT);
      expect(getPhaseValue(secondState)).toBe(K.WARMUP);
    });

    it('should have an blue color', () => {
      expect(getColorValue(initialState)).toBe('')
      expect(getColorValue(secondState)).toBe('blue')
    })

    it('should trigger a warmup setTime side effect', () => {
      expect(effects).toEqual(
         Effects.constant(TimerStateActions.setTime(secondState.getIn([K.WORKOUT,K.PROGRAMS,
           getProgramIdValue(secondState,'4'),'warmup_secs'])))
      );
    });
  })

  describe('exercise', () => {
    const [firstState] = dispatch(initialState, WorkoutStateActions.load('4'));
    const [secondState,effects] = dispatch(firstState, WorkoutStateActions.exercise());

    it('should move to exercise phase', () => {
      expect(getPhaseValue(firstState)).toBe(K.LOAD);
      expect(getPhaseValue(secondState)).toBe(K.EXERCISE);
    })

    it('should increment reps', () => {
      expect(getRepValue(firstState)).toBe(0);
      expect(getRepValue(secondState)).toBe(1);
    })

    it('should set up setOrd', () => {
      expect(getSetOrdValue(firstState)).toBe('1');
      expect(getSetOrdValue(secondState)).toBe('1');
    })

    it('should set up setId', () => {
      expect(getSetIdValue(firstState)).toBe('5');
      expect(getSetIdValue(secondState)).toBe('5');
    })

    it('should have Medium pinch grip', () => {
      expect(getGripValue(firstState)).toBe('Medium pinch')
      expect(getGripValue(secondState)).toBe('Medium pinch')
    })

    it('should have a green color', () => {
      expect(getColorValue(initialState)).toBe('')
      expect(getColorValue(secondState)).toBe('green')
    })

    it('should trigger a exercise setTime side effect', () => {
      expect(effects).toEqual(
         Effects.constant(TimerStateActions.setTime(
           WorkoutStateActions.getCurrSet(secondState.get(K.WORKOUT)).get('secs_on'))
         )
      );
    });
  })

  describe('rest', () => {
    const [firstState] = dispatch(initialState, WorkoutStateActions.load('4'));
    const [secondState,effects] = dispatch(firstState, WorkoutStateActions.rest());

    it('should move to rest phase', () => {
      expect(getPhaseValue(initialState)).toBe(K.INIT);
      expect(getPhaseValue(secondState)).toBe(K.REST);
    });

    it('should have a orange color', () => {
      expect(getColorValue(initialState)).toBe('')
      expect(getColorValue(secondState)).toBe('orange')
    })

    it('should trigger a rest setTime side effect', () => {
      expect(effects).toEqual(
         Effects.constant(TimerStateActions.setTime(
           WorkoutStateActions.getCurrSet(secondState.get(K.WORKOUT)).get('secs_off'))
         )
      );
    });
  })

  // this goes for the second exercise, which is just a single set
  describe('recovery (session) single set exercise', () => {
    const [firstState] = dispatch(initialState, WorkoutStateActions.load('4'));
    const [exerciseState] = dispatch(firstState, WorkoutStateActions.exercise())
    const [secondState, effects] = dispatch(exerciseState, WorkoutStateActions.recover());

    it('should move to recovery phase', () => {
      expect(getPhaseValue(exerciseState)).toBe(K.EXERCISE);
      expect(getPhaseValue(secondState)).toBe(K.RECOVER);
    });

    it('should reset reps', () => {
      expect(getRepValue(exerciseState)).toBe(1);
      expect(getRepValue(secondState)).toBe(0);
    });

    it('should leave setOrd unchanged', () => {
      expect(getSetOrdValue(exerciseState)).toBe('1');
      expect(getSetOrdValue(secondState)).toBe('1');
    });

    it('should leave setId unchanged', () => {
      expect(getSetIdValue(exerciseState)).toBe('5');
      expect(getSetIdValue(secondState)).toBe('5');
    });

    it('should leave workoutId unchanged', () => {
      expect(getWorkoutIdValue(exerciseState)).toBe('4');
      expect(getWorkoutIdValue(secondState)).toBe('4');
    });

    it('should increment exercise', () => {
      expect(getExerciseIdValue(exerciseState)).toBe('1');
      expect(getExerciseIdValue(secondState)).toBe('2');
    });

    it('should increment grip', () => {
      expect(getGripValue(exerciseState)).toBe('Medium pinch')
      expect(getGripValue(secondState)).toBe('Sloper')
    })

    it('should increment weight', () => {
      expect(getWeightValue(exerciseState)).toBe(0)
      expect(getWeightValue(secondState)).toBe(10)
    })

    it('should have a red color', () => {
      expect(getColorValue(initialState)).toBe('')
      expect(getColorValue(secondState)).toBe('red')
    })

    it('should trigger a recover setTime side effect', () => {
      expect(effects).toEqual(
        Effects.batch([
          Effects.constant(TimerStateActions.setTime(
            WorkoutStateActions.getCurrSet(secondState.get(K.WORKOUT)).get('secs_recovery'))),
          Effects.constant(WorkoutStateActions.collectSetResults('1', '1/1', '1', 'Medium pinch', 3, 0, 0))
        ])
      );
    });
  })

  describe('recovery (flow) single set to double set', () => {
    const [state1] = dispatch(initialState, WorkoutStateActions.load('4'));
    const [state2] = dispatch(state1, WorkoutStateActions.warmup())
    const [state3] = dispatch(state2, WorkoutStateActions.exercise())
    const [state4] = dispatch(state3, WorkoutStateActions.rest())
    const [state5] = dispatch(state4, WorkoutStateActions.exercise())
    const [state6] = dispatch(state5, WorkoutStateActions.rest())
    const [state7] = dispatch(state6, WorkoutStateActions.exercise())
    const [state8] = dispatch(state7, WorkoutStateActions.recover())

    it('should increment grip first time', () => {
      expect(getGripValue(state7)).toBe('Medium pinch')
      expect(getGripValue(state8)).toBe('Sloper')
    })

    it('should increment weight first time', () => {
      expect(getWeightValue(state7)).toBe(0)
      expect(getWeightValue(state8)).toBe(10)
    })

    // get us to the second set on this grip/exercise
    const [state9] = dispatch(state8, WorkoutStateActions.exercise())
    const [state10] = dispatch(state9, WorkoutStateActions.rest())
    const [state11] = dispatch(state10, WorkoutStateActions.exercise())
    const [state12] = dispatch(state11, WorkoutStateActions.rest())
    const [state13] = dispatch(state12, WorkoutStateActions.exercise())
    const [state14] = dispatch(state13, WorkoutStateActions.recover())

    it('should not increment grip', () => {
      expect(getGripValue(state13)).toBe('Sloper')
      expect(getGripValue(state14)).toBe('Sloper')
    })

    it('should increment weight', () => {
      //console.log(state14)
      expect(getWeightValue(state13)).toBe(10)
      // TODO the total weight here should be 30 when the addon is included
      expect(getWeightValue(state14)).toBe(10)
    })

    it('should increment setOrd', () => {
      expect(getSetOrdValue(state13)).toBe('1')
      expect(getSetOrdValue(state14)).toBe('2')
    })

    it('should change setId', () => {
      expect(getSetIdValue(state13)).toBe('5')
      expect(getSetIdValue(state14)).toBe('4')
    })

    it('should not increment exercise', () => {
      expect(getExerciseIdValue(state13)).toBe('2')
      expect(getExerciseIdValue(state14)).toBe('2')
    })
  })

  describe('collectSetResults', () => {
    const [state1] = dispatch(initialState, WorkoutStateActions.load('4'));
    const [state2] = dispatch(state1, WorkoutStateActions.warmup())
    const [state3] = dispatch(state2, WorkoutStateActions.exercise())
    const [state4] = dispatch(state3, WorkoutStateActions.rest())
    const [state5] = dispatch(state4, WorkoutStateActions.exercise())
    const [state6] = dispatch(state5, WorkoutStateActions.rest())
    const [state7] = dispatch(state6, WorkoutStateActions.exercise())
    const [state8] = dispatch(state7, WorkoutStateActions.recover())
    // setId, setLabel, exId, grip, reps, weight
    const [state9] = dispatch(state8,
      WorkoutStateActions.collectSetResults('1','1/1', '1', 'Medium pinch', 3, 0, 0))

    it('should trigger result collection', () => {
      expect(getSetResultCollectionValue(state8)).toEqual(Map({}))
      //          Effects.constant(WorkoutStateActions.collectSetResults('1', '1/1', '1', 'Medium pinch', 3, 0))
      expect(getSetResultCollectionValue(state9)).toEqual(
        Map({'setId': '1', 'setLabel': '1/1', 'exId': '1',
          'grip': 'Medium pinch', 'reps': 3, 'sessionWeight': 0,
          'workoutWeight': 0, 'numRepsComplete': 0}))
    })

    const [state10] = dispatch(state9, WorkoutStateActions.collectedSetResults('3', '1', 2))

    it('should handle collected results', () => {
      expect(getResultsValue(state9)).toEqual(Map())
      expect(getResultsValue(state10)).toEqual(Map({'3': Map({'1': 2})}))
    })
  })

  describe('complete', () => {
    const [firstState] = dispatch(initialState, WorkoutStateActions.load('4'));
    const [secondState,effects] = dispatch(firstState, WorkoutStateActions.complete());

    it('should move to complete phase', () => {
      expect(getPhaseValue(initialState)).toBe(K.INIT)
      expect(getPhaseValue(secondState)).toBe(K.COMPLETE)
    })

    it('should set session state to complete', () => {
      expect(getCompleteValue(secondState)).toBe(true)
    })

    it('should have an empty color', () => {
      expect(getColorValue(initialState)).toBe('')
      expect(getColorValue(secondState)).toBe('purple')
    })

    it('should trigger a timer pause side effect', () => {
      expect(effects).toEqual(
        Effects.batch([
          Effects.constant(TimerStateActions.pause()),
          Effects.constant(WorkoutStateActions.collectSetResults('1', '1/1', '1', 'Medium pinch', 3, 0, 0))
        ])
      )
    })
  })

  describe('adjust weight', () => {
    const [state1] = dispatch(initialState, WorkoutStateActions.load('4'));
    const [state2] = dispatch(state1, WorkoutStateActions.adjustWeight(true, false, '1'))

    it('should change the workout and session when updating from workout screen', () => {
      expect(getWeightValue(state1)).toBe(0) // start at 0 and go up 2.5
      expect(getWorkoutsValue(state2).getIn([getWorkoutIdValue(state2),K.WEIGHTS,'1'])).toBe(5)
      expect(getWeightValue(state2)).toBe(5)
      expect(getSetResultCollectionValue(state2)).toBe(Map())
    })

    const [state3] = dispatch(state2, WorkoutStateActions.adjustWeight(true, true, '1'))
    it('should change the workout when updating from set result screen', () => {
      expect(getWorkoutsValue(state3).getIn([getWorkoutIdValue(state3),K.WEIGHTS,'1'])).toBe(10)
      expect(getWeightValue(state3)).toBe(10) // this shouldn't be updated in the result screem
    })

  })

  describe('change grip', () => {
    const [state1] = dispatch(initialState, WorkoutStateActions.load('4'));
    const [state2] = dispatch(state1, WorkoutStateActions.changeGrip('6'))

    it('should change the session grips', () => {
      expect(getSessionGrips(state1).get(getExerciseIdValue(state1))).toBe('7')
      expect(getSessionGrips(state2).get(getExerciseIdValue(state1))).toBe('6')
    })

    it('should change the workout grips', () => {
      expect(getWorkoutGrips(state1,getWorkoutIdValue(state1)).get(getExerciseIdValue(state1))).toBe('7')
      expect(getWorkoutGrips(state2,getWorkoutIdValue(state2)).get(getExerciseIdValue(state2))).toBe('6')
    })

    it('should change the session current grip', () => {
      expect(getCurrentGrip(state1)).toBe('Medium pinch')
      expect(getCurrentGrip(state2)).toBe('Wide pinch')
    })

    // const [state3] = dispatch(state2,
    //   WorkoutStateActions.collectSetResults('1','1/1', '1', 'Medium pinch', 3, 0))

  })

  describe('save to history', () => {
    const [state1] = dispatch(initialState, WorkoutStateActions.load('4'));
    const [state2] = dispatch(state1, WorkoutStateActions.warmup())
    const [state3] = dispatch(state2, WorkoutStateActions.exercise())
    const [state4] = dispatch(state3, WorkoutStateActions.rest())
    const [state5] = dispatch(state4, WorkoutStateActions.exercise())
    const [state6] = dispatch(state5, WorkoutStateActions.rest())
    const [state7] = dispatch(state6, WorkoutStateActions.exercise())
    const [state8] = dispatch(state7, WorkoutStateActions.recover())
    const [state9] = dispatch(state8,
      WorkoutStateActions.collectSetResults('1','1/1', '1', 'Medium pinch', 3, 0))
    const [state10] = dispatch(state9, WorkoutStateActions.collectedSetResults('1', '1', 2))

    const [state3a] = dispatch(state10, WorkoutStateActions.exercise())
    const [state4a] = dispatch(state3a, WorkoutStateActions.rest())
    const [state5a] = dispatch(state4a, WorkoutStateActions.exercise())
    const [state6a] = dispatch(state5a, WorkoutStateActions.rest())
    const [state7a] = dispatch(state6a, WorkoutStateActions.exercise())
    const [state8a] = dispatch(state7a, WorkoutStateActions.recover())
    const [state9a] = dispatch(state8a,
      WorkoutStateActions.collectSetResults('1','1/2', '2', 'Sloper', 3, 10))
    const [state10a] = dispatch(state9a, WorkoutStateActions.collectedSetResults('2', '1', 3))

    const [state3a2] = dispatch(state10a, WorkoutStateActions.exercise())
    const [state4a2] = dispatch(state3a2, WorkoutStateActions.rest())
    const [state5a2] = dispatch(state4a2, WorkoutStateActions.exercise())
    const [state6a2] = dispatch(state5a2, WorkoutStateActions.rest())
    const [state7a2] = dispatch(state6a2, WorkoutStateActions.exercise())
    const [state8a2] = dispatch(state7a2, WorkoutStateActions.recover())
    const [state9a2] = dispatch(state8a2,
      WorkoutStateActions.collectSetResults('2','2/2', '2', 'Sloper', 3, 30))
    const [state10a2] = dispatch(state9a2, WorkoutStateActions.collectedSetResults('2', '2', 1))

    // check that the session results are correct after 2/2
    expect(getResultsValue(state10a2)).toEqual(
      Map({'1': Map({'1': 2}), '2': Map({'1': 3, '2': 1})})
    )

    const [state3b] = dispatch(state10a2, WorkoutStateActions.exercise())
    const [state4b] = dispatch(state3b, WorkoutStateActions.rest())
    const [state5b] = dispatch(state4b, WorkoutStateActions.exercise())
    const [state6b] = dispatch(state5b, WorkoutStateActions.rest())
    const [state7b] = dispatch(state6b, WorkoutStateActions.exercise())
    // no recover after last exercise
    const [state9b] = dispatch(state7b,
      WorkoutStateActions.collectSetResults('1','1/1', '3', 'Little edge (inner)', 3, -10))
    const [state10b] = dispatch(state9b, WorkoutStateActions.collectedSetResults('3', '1', 1))

    it('should save history', () => {
      expect(getHistoryValue(state9b)).toEqual(Map())
      expect(getHistoryValue(state10b).size).toBe(1)
      expect(getHistoryValue(state10b).first())
      .toEqual(Map({'1': Map({'1': 2}), '2': Map({'1': 3,'2': 1}), '3': Map({'1': 1})}))
    })
  })
})
