import * as actionTypes from '../constants/actionTypes'

export default settingsReducer = (state={separateSchedules: true, months: 6}, action) => {
  if (action.type === actionTypes.SET_SHOW_SEPARATE_SCHEDULES) {
    state = {...state, separateSchedules: action.payload};
  } else if (action.type === actionTypes.SET_SETTING_MONTHS) {
    state = {...state, months: action.payload};
  }
  return state;
}
