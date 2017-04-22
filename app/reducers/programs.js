import * as actionTypes from '../constants/actionTypes'

export default programsReducer = (state=[], action) => {
  if (action.type === actionTypes.ADD_PROGRAM) {
    state = state.concat(action.payload);
  } else if (action.type === actionTypes.ADD_KURS) {
    state = state.concat(action.payload);
  } else if (action.type === actionTypes.REMOVE_PROGRAM) {
    state = state.filter(prgm => prgm.name !== action.payload);
  }
  return state;
}
