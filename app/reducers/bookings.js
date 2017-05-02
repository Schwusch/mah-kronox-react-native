import * as actionTypes from '../constants/actionTypes'
import { Alert } from 'react-native'

export default bookingsReducer = (state={
  programs: {},
  signatures: {},
  loading: false
}, action) => {

  if (action.type === actionTypes.BOOKINGS_BODY_PENDING) {
    state = {...state, loading: true};

  } else if (action.type === actionTypes.BOOKINGS_BODY_FULFILLED) {
    state.programs = {...state.programs}
    state.programs[action.program.name] = action.payload
    state = {...state, loading: false};

  } else if (action.type === actionTypes.FETCH_BOOKINGS_ERROR) {
    //Alert.alert("Ingen internetanslutning!")

  } else if (action.type === actionTypes.RESET_BOOKINGS) {
    state = {...state, programs: {}};

  } else if (action.type === actionTypes.REMOVE_PROGRAM) {
    let programs = {...state.programs}
    delete programs[action.payload.name];
    state = {...state, programs: programs};

  } else if (action.type === actionTypes.ADD_SIGNATURE) {
    const signaturehtml = action.data[0].label
    const list = signaturehtml.replace(/<(?:.|\n)*?>/gm, '').split(", ")
    let signatures = {...state.signatures}
    signatures[list[0]] = {name: list[1], loading: false}
    state = {...state, signatures: signatures};
  }

  return state;
}
