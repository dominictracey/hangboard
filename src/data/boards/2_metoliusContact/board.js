/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   07-08-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import {fromJS} from 'immutable'
import {H,K} from '../../../utils/constants'

export const boards_2 = fromJS({
  boards: {
    '2': {
      name: 'Metolius Contact',
      description: 'Camhead\'s shitty jiant old hangboard',
      grips: {
        '1': {
          name: 'Jug',
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
          name: 'Medium edge',
          type: H.EDGE,
        },
        '5': {
          name: 'Small edge',
          type: H.EDGE,
        },
        '6': {
          name: 'XS edge (top)',
          type: H.EDGE,
        },
        '7': {
          name: 'Narrow pinch (top)',
          type: H.PINCH,
        },
        '8': {
          name: 'Medium pinch (middle)',
          type: H.PINCH,
        },
        '9': {
          name: 'Wide pinch (bottom)',
          type: H.PINCH,
        },
        '10': {
          name: 'Large 4F pocket',
          type: H.EDGE,
        },
        '11': {
          name: 'Medium 4F pocket',
          type: H.EDGE,
        },
        '12': {
          name: 'Small 4F pocket',
          type: H.EDGE,
        },
        '13': {
          name: 'Large 3F pocket',
          type: H.FP3,
        },
        '14': {
          name: 'Medium 3F pocket',
          type: H.FP3,
        },
        '15': {
          name: 'Small 3F pocket',
          type: H.FP3,
        },
        '16': {
          name: 'XS 3F pocket',
          type: H.FP3,
        },
        '17': {
          name: 'Large 2F pocket',
          type: H.FP2,
        },
        '18': {
          name: 'Medium 2F pocket',
          type: H.FP2,
        },
        '19': {
          name: 'Small 2F pocket',
          type: H.FP2,
        },
        '20': {
          name: 'XS 2F pocket',
          type: H.FP2,
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
            '2': '13',
            '3': '3',
            '4': '8',
            '5': '17',
            '6': '3',
            '7': '9',
            '8': '2',
            '9': '13',
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
            '8': -50,
          },
          [K.GRIPS]: {
            '1': '1',
            '2': '3',
            '3': '18',
            '4': '5',
            '5': '13',
            '6': '9',
            '7': '2',
            '8': '7',
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
            '1': '3',
            '2': '19',
            '3': '6',
            '4': '18',
            '5': '9',
            '6': '17',
            '7': '7',
          },
        }
      }
    },
  },
})
