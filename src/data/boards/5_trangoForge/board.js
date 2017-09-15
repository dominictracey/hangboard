/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   07-08-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 07-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import {fromJS} from 'immutable'
import {H,K} from '../../../utils/constants'

export const boards_5 = fromJS({
  boards: {
    '5': {
      name: 'Trango Forge',
      description: 'Next Gen Rock Prodigy Board',
      grips: {
        '1': {
          name: 'Big edge',
          type: H.EDGE,
        },
        '2': {
          name: 'Var edge (in)',
          type: H.EDGE,
        },
        '3': {
          name: 'Var edge (mid)',
          type: H.EDGE,
        },
        '4': {
          name: 'Var edge (out)',
          type: H.EDGE,
        },
        '5': {
          name: '40deg sloper',
          type: H.SLOPER,
        },
        '6': {
          name: '30deg sloper',
          type: H.SLOPER,
        },
        '7': {
          name: 'Med pinch',
          type: H.PINCH,
        },
        '8': {
          name: 'Wide pinch',
          type: H.PINCH,
        },
        '9': {
          name: 'Narrow pinch',
          type: H.PINCH,
        },
        '10': {
          name: 'IM big 2F pocket',
          type: H.FP2,
        },
        '11': {
          name: 'IM sm 2F pocket',
          type: H.FP2,
        },
        '12': {
          name: 'MR big 2F pocket',
          type: H.FP2,
        },
        '13': {
          name: 'MR sm 2F pocket',
          type: H.FP2,
        },
        '14': {
          name: 'IMR 3F pocket',
          type: H.FP3,
        },
        '15': {
          name: 'Closed crimp',
          type: H.CRIMP,
        },
        '16': {
          name: 'Slopey crimp',
          type: H.CRIMP,
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
            '2': '14',
            '3': '2',
            '4': '7',
            '5': '12',
            '6': '1',
            '7': '8',
            '8': '6',
            '9': '14',
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
            '1': '6',
            '2': '1',
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
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 0,
          },
          [K.GRIPS]: {
            '1': '1',
            '2': '13',
            '3': '4',
            '4': '4',
            '5': '8',
            '6': '10',
            '7': '9',
          },
        }
      }
    },
  },
})
