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
import {H} from '../../../utils/constants'

export const boards_3 = fromJS({
  boards: {
    '3': {
      name: 'Beastmaker 2000',
      description: 'Hard woody',
      imageUrl: 'http://3.bp.blogspot.com/-IaCtLyyN9jg/TyUPMBgFyII/AAAAAAAACfw/y9U7p-rKuA0/s1600/Beastmaker-annotated.JPG',
      grips: {
        '1': {
          name: 'Sloper - 45',
          type: H.SLOPER,
        },
        '2': {
          name: 'Sloper - 35',
          type: H.SLOPER,
        },
        '3': {
          name: 'Sloper - 20',
          type: H.SLOPER,
        },
        '4': {
          name: 'Deep 3F pocket',
          type: H.FP3,
        },
        '5': {
          name: 'Large flat edge',
          type: H.EDGE,
        },
        '6': {
          name: 'Deep mono',
          type: H.FP1,
        },
        '7': {
          name: 'Deep (back 2) 2F pocket',
          type: H.FP2,
        },
        '8': {
          name: 'Deep 2F pocket',
          type: H.FP2,
        },
        '9': {
          name: 'Large flat edge',
          type: H.EDGE,
        },
        '10': {
          name: 'Small edge',
          type: H.EDGE,
        },
        '11': {
          name: 'Shallow mono',
          type: H.FP1,
        },
        '12': {
          name: 'Shallow 2F pocket',
          type: H.FP2,
        },
        '13': {
          name: 'Sloping 2F pocket',
          type: H.FP2,
        },
        '14': {
          name: 'Incut edge',
          type: H.EDGE,
        },
      },
    },
  },
})
