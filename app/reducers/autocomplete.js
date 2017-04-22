import * as actionTypes from '../constants/actionTypes'

export default autocompleteReducer = (state={data: [], loading: false}, action) => {
  if (action.type === actionTypes.SET_AUTOCOMPLETE) {
    action.data.map(obj => obj.label = obj.label.replace(/<(?:.|\n)*?>/gm, ''));
    state = {data: action.data, loading: false};
  } else if (action.type === actionTypes.AUTOCOMPLETE_REQUEST) {
    state = {data: [], loading: true};
  } else if (action.type === actionTypes.RESET_AUTOCOMPLETE) {
    state = {data: [], loading: false};
  }
  return state;
}
