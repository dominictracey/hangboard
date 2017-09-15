import {fromJS} from 'immutable'

const boardIndex = fromJS({
  boards: {
    index: {
      '1': {
        name: 'Trango Rock Prodigy Training Center',
        location: '1_trangoRockProdigySplit',
      },
      '2': {
        name: 'Metolius Contact',
        location: '2_metoliusContact',
      },
      '4': {
        name: 'Beastmaker 1000',
        location: '4_beastmaker1000',
      },
      '5': {
        name: 'Trango Forge',
        location: '5_trangoForge',
      },
    }
  }
})

export default boardIndex
