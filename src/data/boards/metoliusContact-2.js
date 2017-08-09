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
import {H} from '../../utils/constants'

export const boards = fromJS({
  boardsContact: {
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
          name: 'Large 4 finger pocket',
          type: H.EDGE,
        },
        '11': {
          name: 'Medium 4 finger pocket',
          type: H.EDGE,
        },
        '12': {
          name: 'Small 4 finger pocket',
          type: H.EDGE,
        },
        '13': {
          name: 'Large 3 finger pocket',
          type: H.FP3,
        },
        '14': {
          name: 'Medium 3 finger pocket',
          type: H.FP3,
        },
        '15': {
          name: 'Small 3 finger pocket',
          type: H.FP3,
        },
        '16': {
          name: 'XS 3 finger pocket',
          type: H.FP3,
        },
        '17': {
          name: 'Large 2 finger pocket',
          type: H.FP2,
        },
        '18': {
          name: 'Medium 2 finger pocket',
          type: H.FP2,
        },
        '19': {
          name: 'Small 2 finger pocket',
          type: H.FP2,
        },
        '20': {
          name: 'XS 2 finger pocket',
          type: H.FP2,
        },
      },
    },
  },
})
