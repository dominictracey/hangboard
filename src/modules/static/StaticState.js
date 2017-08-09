import {fromJS} from 'immutable';

export const LOAD_STATIC_STATE = 'StaticState/LOAD';

// Initial state
const initialState = fromJS({
  boards: {
    '0': {
      name: 'Trango Split Board',
      grips: {
        '0': {
          name: 'jug'
        },
        '1': {
          name: 'big crimp (in)'
        },
        '2': {
          name: 'big crimp (out)'
        },
        '3': {
          name: 'little crimp (in)'
        },
        '4': {
          name: 'sloper'
        },
        '5': {
          name: 'IMR 2-pad 3F'
        },
        '6': {
          name: 'wide pinch'
        },
        '7': {
          name: 'narrow pinch'
        },
      },
    },
  },
  sets: {
    '0': {
      description: '10 on/5 off x 6',
      source: 'Rock Prodigy - beginner',
      reps: 6,
      secs_on: 10,
      secs_off: 5,
      secs_recovery: 180,
      baseline_plus: 0
    },
    '1': {
      description: '7 on/3 off x 7',
      source: 'Rock Prodigy - intermediate 1',
      reps: 7,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 0
    },
    '2': {
      description: '7 on/3 off x 6 - baseline+10',
      source: 'Rock Prodigy - intermediate 2',
      reps: 6,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 10
    },
    '3': {
      description: '7 on/3 off x 5 - baseline+20',
      source: 'Rock Prodigy - advanced 3',
      reps: 5,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 20
    },
    '4': {
      description: 'test',
      source: 'test',
      reps: 3,
      secs_on: 1,
      secs_off: 1,
      secs_recovery: 5,
      baseline_plus: 0
    },
  },
  programs: {
    '0': {
      title: 'Rock Prodigy Beginner Program on Trango Split',
      author: 'Manderson',
      level: 'beginner',
      board: '0',
      warmup_secs: 5,
      exercises: {
        '1': {
          grip: '0',
          sets: {
            '1': '0'
          }
        },
        '2': {
          grip: '1',
          sets: {
            '1': '0'
          }
        },
        '3': {
          grip: '2',
          sets: {
            '1': '0'
          }
        },
        '4': {
          grip: '3',
          sets: {
            '1': '0'
          }
        },
        '5': {
          grip: '4',
          sets: {
            '1': '0'
          }
        },
        '6': {
          grip: '5',
          sets: {
            '1': '0'
          },
        },
      },
    },
    '1': {
      title: 'TEST PROGRAM ON TRANGO SPLIT',
      author: 'DPT',
      level: 'advanced',
      board: '0',
      warmup_secs: 3,
      exercises: {
        '1': {
          grip: '0',
          sets: {
            '1': '4'
          }
        },
        '2': {
          grip: '1',
          sets: {
            '1': '4'
          }
        },
        '3': {
          grip: '2',
          sets: {
            '1': '4'
          }
        },
      },
    },
  },
})

// export function resetSessionStateFromSnapshot(state) {
//   return {
//     type: RESET_STATE,
//     payload: state
//   };
// }
//
export function LoadStaticState() {
  return {
    type: LOAD_STATIC_STATE,
  };
}

// Reducer
export default function SessionStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_STATIC_STATE:
      return state.set('isReady', true);

    default:
      return state;
  }
}
