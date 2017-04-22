import * as actionTypes from '../constants/actionTypes'

export default settingsReducer = (state={separateSchedules: true}, action) => {
  if (action.type === actionTypes.SET_SHOW_SEPARATE_SCHEDULES) {
    state = {...state, separateSchedules: action.payload};
  }
  return state;
}
