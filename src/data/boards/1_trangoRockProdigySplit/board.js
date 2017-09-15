import {fromJS} from 'immutable'
import {H,K} from '../../../utils/constants'

export const boards_1 = fromJS({
  boards: {
    '1': {
      'name': 'Trango Rock Prodigy Training Center',
      'description': 'Blue split board aligned with Mark Anderson\'s seminal book "Training for Rock Climbing"',
      'grips': {
        '1': {
          'name': 'Warm-up Jug',
          'type': H.JUG,
        },
        '2': {
          'name': 'Sloper',
          'type': H.SLOPER,
        },
        '3': {
          'name': 'Large edge',
          'type': H.EDGE,
        },
        '4': {
          'name': 'Small edge',
          'type': H.EDGE,
        },
        '5': {
          'name': 'Crimp',
          'type': H.EDGE,
        },
        '6': {
          'name': 'Wide pinch',
          'type': 'pinch',
        },
        '7': {
          'name': 'Medium pinch',
          'type': H.PINCH,
        },
        '8': {
          'name': 'Narrow pinch',
          'type': 'pinch',
        },
        '9': {
          'name': 'MRP 3F pocket (deep)',
          'type': H.FP3,
        },
        '10': {
          'name': 'IMR 3F pocket (var)',
          'type': H.FP3,
        },
        '11': {
          'name': 'Medium MR 2F pocket',
          'type': H.FP2,
        },
        '12': {
          'name': 'IM 2F pocket',
          'type': H.FP2,
        },
        '13': {
          'name': 'Small MR 2F pocket',
          'type': H.FP2,
        },
        '14': {
          'name': 'Mono',
          'type': H.FP1,
        },
      },
      [K.DEFAULTS]: {
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
            '3': '4',
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
})
