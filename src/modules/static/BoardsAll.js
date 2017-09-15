import {fromJS} from 'immutable'

import {boards_1} from '../../data/boards/1_trangoRockProdigySplit/board.js'
import {boards_2} from '../../data/boards/2_metoliusContact/board.js'
import {boards_4} from '../../data/boards/4_beastmaker1000/board.js'
import {boards_5} from '../../data/boards/5_trangoForge/board.js'

export const boardImages = fromJS({
  '1': require('../../data/boards/1_trangoRockProdigySplit/board.png'),
  '2': require('../../data/boards/2_metoliusContact/board.png'),
  '4': require('../../data/boards/4_beastmaker1000/board.png'),
  '5': require('../../data/boards/5_trangoForge/board.png'),
})

export default boards_1.mergeDeep(boards_2)
                        .mergeDeep(boards_4)
                        .mergeDeep(boards_5)
