import store from '../store/store';
import * as actionTypes from '../constants/actionTypes';

export const fetchBookings = (program) => {
  const baseUrl = "https://kronox.mah.se/setup/jsp/SchemaICAL.ics";
  const parameters = `?startDatum=idag&intervallTyp=m&intervallAntal=6&sokMedAND=false&sprak=SV&resurser=p.${program}`
  store.dispatch((dispatch) => {
    fetch(`${baseUrl}${parameters}`)
    .then((response) => {
       dispatch({
         type: actionTypes.BOOKINGS_BODY,
         payload: response.text()
       })
    })
    .catch((err) => {
      dispatch({type: actionTypes.FETCH_BOOKINGS_ERROR, payload: err});
    })
  });
}
