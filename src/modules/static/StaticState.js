import {fromJS} from 'immutable'
import {H} from '../../utils/constants'

export const LOAD_STATIC_STATE = 'StaticState/LOAD';

// Initial state
const initialState = fromJS({
  boards: {
    '1': {
      name: 'Trango Rock Prodigy Training Center',
      description: 'Blue split board aligned with Mark Anderson\'s seminal book \"Training for Rock Climbing\"',
      grips: {
        '1': {
          name: 'Warm-up Jug',
          type: H.JUG,
        },
        '2': {
          name: 'Sloper',
          type: H.SLOPER,
        },
        '3': {
          name: 'Large edge',
          type: H.EDGE,
        },
        '4': {
          name: 'Small edge',
          type: H.EDGE,
        },
        '5': {
          name: 'Crimp',
          type: H.EDGE,
        },
        '6': {
          name: 'Wide pinch',
          type: H.PINCH,
        },
        '7': {
          name: 'Medium pinch',
          type: H.PINCH,
        },
        '8': {
          name: 'Narrow pinch',
          type: H.PINCH,
        },
        '9': {
          name: 'MRP 3F pocket (deep)',
          type: H.FP3,
        },
        '10': {
          name: 'IMR 3F pocket (var)',
          type: H.FP3,
        },
        '11': {
          name: 'Medium MR 2F pocket',
          type: H.FP2,
        },
        '12': {
          name: 'IM 2F pocket',
          type: H.FP2,
        },
        '13': {
          name: 'Small MR 2F pocket',
          type: H.FP2,
        },
        '14': {
          name: 'Mono',
          type: H.FP1,
        },
      },
    },
  },
  sets: {
    '1': {
      description: '10 on/5 off x 6',
      source: 'Rock Prodigy - beginner',
      reps: 6,
      secs_on: 10,
      secs_off: 5,
      secs_recovery: 180,
      baseline_plus: 0
    },
    '2': {
      description: '7 on/3 off x 7',
      source: 'Rock Prodigy - intermediate 1',
      reps: 7,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 0
    },
    '3': {
      description: '7 on/3 off x 6 - baseline+10',
      source: 'Rock Prodigy - intermediate 2',
      reps: 6,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 10
    },
    '4': {
      description: '7 on/3 off x 5 - baseline+20',
      source: 'Rock Prodigy - advanced 3',
      reps: 5,
      secs_on: 7,
      secs_off: 3,
      secs_recovery: 180,
      baseline_plus: 20
    },
    '5': {
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
    '1': {
      title: 'Rock Prodigy Beginner Program',
      author: 'Manderson',
      level: 'beginner',
      warmup_secs: 1200,
      prep_secs: 10,
      exercises: {
        '1': {
          sets: {
            '1': '1'
          }
        },
        '2': {
          sets: {
            '1': '1'
          }
        },
        '3': {
          sets: {
            '1': '1'
          }
        },
        '4': {
          sets: {
            '1': '1'
          }
        },
        '5': {
          sets: {
            '1': '1'
          }
        },
        '6': {
          sets: {
            '1': '1'
          },
        },
        '7': {
          sets: {
            '1': '1'
          },
        },
        '8': {
          sets: {
            '1': '1'
          },
        },
        '9': {
          sets: {
            '1': '1'
          },
        },
      },
    },
    '2': {
      title: 'TEST PROGRAM',
      author: 'DPT',
      level: 'advanced',
      warmup_secs: 3,
      prep_secs: 10,
      exercises: {
        '1': {
          sets: {
            '1': '5',
          }
        },
        '2': {
          sets: {
            '1': '5',
            '2': '4',
          }
        },
        '3': {
          sets: {
            '1': '5',
          }
        },
      },
    },
    '3': {
      title: 'Rock Prodigy Intermediate Program',
      author: 'Manderson',
      level: 'intermediate',
      warmup_secs: 1200,
      prep_secs: 10,
      exercises: {
        '1': {
          sets: {
            '1': '2',
          },
        },
        '2': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '3': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '4': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '5': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '6': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '7': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '8': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
      },
    },
    '4': {
      title: 'Rock Prodigy Advanced Program',
      author: 'Manderson',
      level: 'advanced',
      warmup_secs: 1200,
      prep_secs: 10,
      exercises: {
        '1': {
          sets: {
            '1': '2',
            '2': '3',
          },
        },
        '2': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
        '3': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
        '4': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
        '5': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
        '6': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
        '7': {
          sets: {
            '1': '2',
            '2': '3',
            '3': '4',
          },
        },
      },
    },
  },
})

export function LoadStaticState() {
  return {
    type: LOAD_STATIC_STATE,
  };
}

// Reducer
export default function StaticStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_STATIC_STATE:
      return state.set('isReady', true);

    default:
      return state;
  }
}
