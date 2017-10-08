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
  CONFIGURATION: 'configuration',
  WORKOUT: 'workout',
  EXERCISES: 'exercises',
  PROGRAMS: 'programs',
  PROGRAM: 'program',

  BOARDS: 'boards',
  HISTORY: 'history',
  SETTINGS: 'settings',
  BOARD: 'board',
  BOARD_ID: 'boardId',
  BOARD_LABEL: 'boardLabel',
  PROGRAM_ID: 'programId',
  PROGRAM_LABEL: 'programLabel',
  RESULTS: 'results',

  // phases
  INIT: 'WorkoutState/INIT',
  LOAD: 'WorkoutState/LOAD',
  WARMUP: 'WorkoutState/WARMUP', // begin phases of workout
  PREP: 'WorkoutState/PREP', // time needed between warmup and exercise
  EXERCISE: 'WorkoutState/EXERCISE',
  REST: 'WorkoutState/REST',
  RECOVER: 'WorkoutState/RECOVER',
  COMPLETE: 'WorkoutState/COMPLETE', // the workout is done

  // phase labels
  INIT_PHASE_LABEL: 'Init',
  LOAD_PHASE_LABEL: 'Load',
  WARMUP_PHASE_LABEL: 'Warmup', // begin phases of workout
  PREP_PHASE_LABEL: 'Get ready!', // time needed between warmup and exercise
  EXERCISE_PHASE_LABEL: 'Exercise',
  REST_PHASE_LABEL: 'Rest',
  RECOVER_PHASE_LABEL: 'Recover',
  COMPLETE_PHASE_LABEL: 'Complete',

  SECONDS: 'seconds',
  RUNNING: 'running',
  INTERVAL: 'interval',

  GRIP: 'grip',
  GRIP_ID: 'gripId',
  GRIP_LABEL: 'gripLabel',
  GRIPS: 'grips',
  NEXT_GRIP: 'nextGrip',

  PHASE_LABEL: 'currentPhaseLabel',
  PHASE: 'phase',

  SETS: 'sets',
  SET_ID: 'setId',
  SET_LABEL: 'setLabel',
  CURRENT_SET_ORD: 'currentSetOrd',
  CURRENT_SET_ID: 'currentSetId',

  WORKOUT_ID: 'workoutId',
  LAST_WORKOUT_ID: 'lastWorkoutId',
  WORKOUT_LABEL: 'workoutLabel',

  CURRENT_EXERCISE_ORD: 'currentExerciseOrd',
  CURRENT_EXERCISE_ID: 'currentExerciseId',
  CURRENT_EXERCISE: 'currentExercise',
  EXERCISE_LABEL: 'exerciseLabel',

  WEIGHTS: 'weights',
  WEIGHT: 'weight',
  NEXT_WEIGHT: 'nextWeight',

  CURRENT_REP: 'currentRep',
  REPS: 'reps',
  REP_LABEL: 'repLabel',

  COLLECT_SET_RESULTS: 'collectSetResults',
  LAST_SUCCESSES: 'lastSuccesses',
  LAST_SUCCESS: 'lastSuccess',
  COMPLETED: 'complete',
  COLOR: 'color',
  THEME: 'theme',
  PREP_SECS: 'prep_secs',
  SOUNDS: 'sounds',
  TICKS: 'ticks',
  BEEPS: 'beeps',
  DINGS: 'dings',
  TICKS_FOR: 'ticksForPhases',
  BEEPS_FOR: 'beepsForPhases',
  DINGS_FOR: 'dingsForPhases',
  DEFAULT_PROGRAM_ID: 'defaultProgramId',
  DEFAULT_BOARD_ID: 'defaultBoardId',

  // history Actions
  HISTORY_START_WORKOUT: 'historyState/StartWorkout',
  HISTORY_RECORD_SET: 'historyState/RecordSet',
  HISTORY_DELETE_SET: 'historyState/DeleteSet',
  HISTORY_UPDATE_SET: 'historyState/UpdateSet',
  HISTORY_COMPLETE_WORKOUT: 'historyState/CompleteWorkout',
  CURRENT: 'Current Workout',
  NOTE: 'note',
  HISTORY_LABEL: 'historyLabel',
  NAME: 'name',

  // program types
  BEGINNER: 'programType/BEGINNER',
  INTERMEDIATE: 'programType/INTERMEDIATE',
  ADVANCED: 'programType/ADVANCED',
  CUSTOM: 'programType/CUSTOM',

  TITLE: 'title',

  // board keys
  DEFAULTS: 'defaults',
  LEVEL: 'level',
}

export const M = {
  PHASE: [K.SESSION,K.PHASE],
  PHASE_LABEL: [K.SESSION,K.PHASE_LABEL],
  CURRENT_SET_ORD: [K.SESSION,K.CURRENT_SET_ORD],
  CURRENT_SET_ID: [K.SESSION,K.CURRENT_SET_ID],
  SET_LABEL: [K.SESSION,K.SET_LABEL],
  WORKOUT_ID: [K.SESSION,K.WORKOUT_ID],
  //WORKOUTS: [K.SESSSION,K.WORKOUTS],
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
  COMPLETED: [K.SESSION,K.COMPLETED],
  COLOR: [K.SESSION,K.COLOR],
  //sound Settings
  TICKS_FOR: [K.SOUNDS,K.TICKS_FOR],
  BEEPS_FOR: [K.SOUNDS,K.BEEPS_FOR],
  DINGS_FOR: [K.SOUNDS,K.DINGS_FOR],
  // history
  RESULTS: [K.CURRENT,K.RESULTS],
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
