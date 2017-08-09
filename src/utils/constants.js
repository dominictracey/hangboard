/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   05-08-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

// singular state keys for use in get/update/set Immutable access
export const K = {
  SESSION: 'session',
  WORKOUTS: 'workouts',
  WORKOUT: 'workout',
  EXERCISES: 'exercises',
  PROGRAMS: 'programs',
  PROGRAM: 'program',
  SETS: 'sets',
  BOARDS: 'boards',
  HISTORY: 'history',
  GRIP: 'grip',
  PHASE: 'currentPhase',
  CURRENT_SET_ORD: 'currentSetOrd',
  CURRENT_SET_ID: 'currentSetId',
  SET_LABEL: 'setLabel',
  WORKOUT_ID: 'workoutId',
  LAST_WORKOUT_ID: 'lastWorkoutId',
  CURRENT_EXERCISE_ORD: 'currentExerciseOrd',
  CURRENT_EXERCISE_ID: 'currentExerciseId',
  CURRENT_EXERCISE: 'currentExercise',
  EXERCISE_LABEL: 'exerciseLabel',
  GRIPS: 'grips',
  NEXT_GRIP: 'nextGrip',
  WEIGHTS: 'weights',
  WEIGHT: 'weight',
  NEXT_WEIGHT: 'nextWeight',
  CURRENT_REP: 'currentRep',
  REP_LABEL: 'repLabel',
  COLLECT_SET_RESULTS: 'collectSetResults',
  LAST_SUCCESSES: 'lastSuccesses',
  COMPLETE: 'complete',
  COLOR: 'color',
}

export const M = {
  PHASE: [K.SESSION,K.PHASE],
  CURRENT_SET_ORD: [K.SESSION,K.CURRENT_SET_ORD],
  CURRENT_SET_ID: [K.SESSION,K.CURRENT_SET_ID],
  SET_LABEL: [K.SESSION,K.SET_LABEL],
  WORKOUT_ID: [K.SESSION,K.WORKOUT_ID],
  LAST_WORKOUT_ID: [K.SESSION,K.LAST_WORKOUT_ID],
  CURRENT_EXERCISE_ORD: [K.SESSION,K.CURRENT_EXERCISE_ORD],
  CURRENT_EXERCISE_ID: [K.SESSION,K.CURRENT_EXERCISE_ID],
  CURRENT_EXERCISE: [K.SESSION,K.CURRENT_EXERCISE],
  EXERCISE_LABEL: [K.SESSION,K.EXERCISE_LABEL],
  GRIP: [K.SESSION,K.GRIP],
  GRIPS: [K.SESSION,K.GRIPS],
  NEXT_GRIP: [K.SESSION,K.NEXT_GRIP],
  WEIGHTS: [K.SESSION,K.WEIGHTS],
  CURRENT_WEIGHT: [K.SESSION,K.WEIGHT],
  NEXT_WEIGHT: [K.SESSION,K.NEXT_WEIGHT],
  CURRENT_REP: [K.SESSION,K.CURRENT_REP],
  REP_LABEL: [K.SESSION,K.REP_LABEL],
  COLLECT_SET_RESULTS: [K.SESSION,K.COLLECT_SET_RESULTS],
  LAST_SUCCESSES: [K.SESSION,K.LAST_SUCCESSES],
  COMPLETE: [K.SESSION,K.COMPLETE],
  COLOR: [K.SESSION,K.COLOR],
}

export const H = {
  JUG: 'J',
  EDGE: 'E',
  SLOPER: 'S',
  PINCH: 'P',
  FP3: 'FP3',
  FP2: 'FP2',
  FP1: 'FP1',
}
