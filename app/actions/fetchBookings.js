import store from '../store/store';
import * as actionTypes from '../constants/actionTypes';

export const fetchBookings = (program) => {
  const baseUrl = "https://kronox.mah.se/setup/jsp/SchemaICAL.ics";
  const prefix = program.type === "KURS" ? "k" : "p";
  const parameters = `?startDatum=idag&intervallTyp=m&intervallAntal=6&sokMedAND=false&sprak=SV&resurser=${prefix}.${program.name}`
  store.dispatch({
    type: actionTypes.BOOKINGS_BODY_PENDING
  });
  store.dispatch(dispatch => {
    fetch(`${baseUrl}${parameters}`)
    .then(response => response.text())
    .then(text =>
      dispatch({
        type: actionTypes.BOOKINGS_BODY_FULFILLED,
        payload: text,
        program
      })
    )
    .catch(err =>
      dispatch({type: actionTypes.FETCH_BOOKINGS_ERROR, payload: err})
    )
  });
}

export const fetchAllBookings = () => {
  for(program of store.getState().programs) {
    fetchBookings(program)
  }
}
