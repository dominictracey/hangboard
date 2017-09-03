import {Map} from 'immutable';

// Initial state
const initialState = Map({

});

// Actions
const ACTION = 'HistoryState/ACTION';

// Action creators
export function act() {
  return {type: ACTION};
}

// Reducer
export default function HistoryStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION:
      return state;
    default:
      return state;
  }
}
