import {fromJS} from 'immutable'
import {H,K} from '../../utils/constants'
import boardIndex from './BoardIndex'
import allBoards from './BoardsAll'
export const LOAD_STATIC_STATE = 'StaticState/LOAD'
export const LOAD_BOARD = 'StaticState/LOAD_BOARD'

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
      defaults: {
        [K.BEGINNER]: {
          [K.WEIGHTS]: {
            '1': 0,
            '2': -30,
            '3': -30,
            '4': -40,
            '5': -40,
            '6': -20,
            '7': -50,
            '8': -20,
            '9': -40,
          },
          [K.GRIPS]: {
            '1': '1',
            '2': '9',
            '3': '3',
            '4': '7',
            '5': '11',
            '6': '3',
            '7': '6',
            '8': '2',
            '9': '9',
          },
        },
        [K.INTERMEDIATE]: {
          [K.WEIGHTS]: {
            '1': 10,
            '2': 0,
            '3': -30,
            '4': -10,
            '5': -20,
            '6': -40,
            '7': -10,
            '8': -50,
          },
          [K.GRIPS]: {
            '1': '1',
            '2': '3',
            '3': '13',
            '4': '4',
            '5': '10',
            '6': '6',
            '7': '2',
            '8': '8',
          },
        },
        [K.ADVANCED]: {
          [K.WEIGHTS]: {
            '1': 0,
            '2': -20,
            '3': 0,
            '4': -30,
            '5': -20,
            '6': -30,
            '7': -30,
          },
          [K.GRIPS]: {
            '1': '3',
            '2': '13',
            '3': '4',
            '4': '14',
            '5': '6',
            '6': '12',
            '7': '8',
          },
        }
      }
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
      title: 'Beginner',
      author: 'Manderson',
      level: K.BEGINNER,
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
    '3': {
      title: 'Intermediate',
      author: 'Manderson',
      level: K.INTERMEDIATE,
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
      title: 'Advanced',
      author: 'Manderson',
      level: K.ADVANCED,
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
}).mergeDeep(boardIndex)

export function loadStaticState() {
  return {
    type: LOAD_STATIC_STATE,
  };
}

export function loadBoard(boardId) {
  return {type: LOAD_BOARD, boardId}
}

// Reducer
export default function StaticStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_STATIC_STATE:
      return state.set('isReady', true)
    case LOAD_BOARD:
      // have to pull it into state
      // for now, it's just in the data directory
      console.log('importing boardId ' + action.boardId)
      var boardMeta = state.getIn(['boards','index',action.boardId])
      if (boardMeta) {
        const boardData =
              // https://github.com/facebook/react-native/issues/6391
              //require('../../data/boards/' + boardMeta.get('location') + '/board.js')
              allBoards.getIn([K.BOARDS,action.boardId])
        return state.mergeDeepIn([K.BOARDS,action.boardId],boardData)
      } else {
        console.log('could not find requested board meta data')
        return state
      }

    default:
      return state;
  }
}
