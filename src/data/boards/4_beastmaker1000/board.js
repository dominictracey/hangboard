import {fromJS} from 'immutable'
import {H,K} from '../../../utils/constants'

export const boards_4 = fromJS({
  boards: {
    '4': {
      name: 'Beastmaker 1000',
      description: 'Hard woody',
      grips: {
        '1': {
          name: 'Large jug',
          type: H.JUG,
        },
        '2': {
          name: '35deg Sloper',
          type: H.SLOPER,
        },
        '3': {
          name: '20deg Sloper',
          type: H.SLOPER,
        },
        '4': {
          name: 'Big 4F pocket',
          type: H.FP4,
        },
        '5': {
          name: 'Med 4F pocket',
          type: H.FP4,
        },
        '6': {
          name: 'Small 4F pocket',
          type: H.FP4,
        },
        '7': {
          name: 'Big 3F pocket',
          type: H.FP3,
        },
        '8': {
          name: 'Med 3F pocket',
          type: H.FP3,
        },
        '9': {
          name: 'Small 3F pocket',
          type: H.FP3,
        },
        '10': {
          name: 'Big 2F pocket',
          type: H.FP2,
        },
        '11': {
          name: 'Small 2F pocket',
          type: H.FP2,
        },
        '12': {
          name: 'XL 4F pocket',
          type: H.FP4,
        },
      },
      [K.DEFAULTS]: {
        [K.BEGINNER]: {
          [K.WEIGHTS]: {
            '1': 0,
            '2': -20,
            '3': -20,
            '4': -20,
            '5': -20,
            '6': -20,
            '7': -20,
            '8': -20,
            '9': -20,
          },
          [K.GRIPS]: {
            '1': '1',
            '2': '7',
            '3': '5',
            '4': '3',
            '5': '10',
            '6': '4',
            '7': '5',
            '8': '2',
            '9': '8',
          },
        },
        [K.INTERMEDIATE]: {
          [K.WEIGHTS]: {
            '1': 10,
            '2': 0,
            '3': -30,
            '4': -10,
            '5': -20,
            '6': -20,
            '7': -10,
            '8': -30,
          },
          [K.GRIPS]: {
            '1': '1',
            '2': '4',
            '3': '11',
            '4': '6',
            '5': '2',
            '6': '7',
            '7': '3',
            '8': '10',
          },
        },
        [K.ADVANCED]: {
          [K.WEIGHTS]: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 0,
          },
          [K.GRIPS]: {
            '1': '4',
            '2': '11',
            '3': '2',
            '4': '8',
            '5': '9',
            '6': '10',
            '7': '6',
          },
        }
      }
    },
  },
})
